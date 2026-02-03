import React, { useState } from 'react';
import { X, Mail, Link, Check, Copy, Send, Users } from 'lucide-react';
import { COLORS } from '../../constants';

/**
 * InviteCaregiverModal - Invite caregivers via email or shareable link
 *
 * Props:
 * - onClose: Function to close the modal
 * - onInvite: Function called with invite data { email, method }
 * - caregivers: Array of existing caregivers
 * - childName: Name of the child for personalized messaging
 */
const InviteCaregiverModal = ({
  onClose,
  onInvite,
  caregivers = [],
  childName = 'your little one'
}) => {
  const [activeTab, setActiveTab] = useState('email'); // 'email' or 'link'
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  // Generate a mock shareable link
  const shareableLink = `https://mooshiemoments.com/invite/${btoa(childName).slice(0, 8)}`;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailInvite = () => {
    if (!email.trim()) {
      setEmailError('Please enter an email address');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Check if already invited
    const alreadyInvited = caregivers.some(c => c.email.toLowerCase() === email.toLowerCase());
    if (alreadyInvited) {
      setEmailError('This email has already been invited');
      return;
    }

    setEmailError('');

    // Call the onInvite callback
    if (onInvite) {
      onInvite({
        method: 'email',
        email: email.trim(),
        name: name.trim() || email.split('@')[0],
        status: 'pending',
      });
    }

    setInviteSent(true);

    // Reset after showing success
    setTimeout(() => {
      setEmail('');
      setName('');
      setInviteSent(false);
    }, 2000);
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareableLink);
      }
      setLinkCopied(true);

      // Track the share
      if (onInvite) {
        onInvite({
          method: 'link',
          link: shareableLink,
        });
      }

      setTimeout(() => setLinkCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div
        className="rounded-t-3xl p-6 w-full max-w-md animate-slide-up"
        style={{ backgroundColor: COLORS.cream }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Users size={24} style={{ color: COLORS.purple }} />
            <h2 className="text-xl font-black" style={{ color: COLORS.purple }}>
              Invite Caregiver
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" style={{ color: COLORS.text }} />
          </button>
        </div>

        <p className="text-sm mb-4" style={{ color: COLORS.text }}>
          Share access to {childName}'s activities and memories with family members or caregivers.
        </p>

        {/* Tab Switcher */}
        <div
          className="flex rounded-xl p-1 mb-4"
          style={{ backgroundColor: '#F0F0F0' }}
        >
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all`}
            style={{
              backgroundColor: activeTab === 'email' ? '#fff' : 'transparent',
              color: activeTab === 'email' ? COLORS.purple : COLORS.textLight,
              boxShadow: activeTab === 'email' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <Mail size={16} />
            Email Invite
          </button>
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all`}
            style={{
              backgroundColor: activeTab === 'link' ? '#fff' : 'transparent',
              color: activeTab === 'link' ? COLORS.purple : COLORS.textLight,
              boxShadow: activeTab === 'link' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <Link size={16} />
            Share Link
          </button>
        </div>

        {/* Email Invite Tab */}
        {activeTab === 'email' && (
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                className="block text-sm font-bold mb-1"
                style={{ color: COLORS.text }}
              >
                Name (optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Grandma, Nanny Sarah"
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all"
                style={{
                  borderColor: '#E5E7EB',
                  backgroundColor: '#fff',
                }}
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                className="block text-sm font-bold mb-1"
                style={{ color: COLORS.text }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                placeholder="caregiver@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all"
                style={{
                  borderColor: emailError ? COLORS.coral : '#E5E7EB',
                  backgroundColor: '#fff',
                }}
              />
              {emailError && (
                <p className="text-xs mt-1" style={{ color: COLORS.coral }}>
                  {emailError}
                </p>
              )}
            </div>

            {/* Send Button */}
            <button
              onClick={handleEmailInvite}
              disabled={inviteSent}
              className="w-full py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all"
              style={{
                backgroundColor: inviteSent ? COLORS.green : COLORS.purple,
                color: '#fff',
                opacity: inviteSent ? 0.9 : 1,
              }}
            >
              {inviteSent ? (
                <>
                  <Check size={18} />
                  Invite Sent!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Invite
                </>
              )}
            </button>
          </div>
        )}

        {/* Share Link Tab */}
        {activeTab === 'link' && (
          <div className="space-y-4">
            <p className="text-sm" style={{ color: COLORS.textLight }}>
              Share this link with anyone you'd like to give access to {childName}'s profile.
            </p>

            {/* Link Display */}
            <div
              className="p-4 rounded-xl border-2 flex items-center gap-3"
              style={{ backgroundColor: '#fff', borderColor: '#E5E7EB' }}
            >
              <div className="flex-1 truncate">
                <p className="text-sm font-mono" style={{ color: COLORS.text }}>
                  {shareableLink}
                </p>
              </div>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg transition-all"
                style={{
                  backgroundColor: linkCopied ? `${COLORS.green}20` : COLORS.purplePale,
                }}
              >
                {linkCopied ? (
                  <Check size={20} style={{ color: COLORS.green }} />
                ) : (
                  <Copy size={20} style={{ color: COLORS.purple }} />
                )}
              </button>
            </div>

            {linkCopied && (
              <p
                className="text-sm text-center font-bold"
                style={{ color: COLORS.green }}
              >
                Link copied to clipboard!
              </p>
            )}

            {/* Copy Button */}
            <button
              onClick={handleCopyLink}
              className="w-full py-3 rounded-xl font-black flex items-center justify-center gap-2"
              style={{ backgroundColor: COLORS.purple, color: '#fff' }}
            >
              <Copy size={18} />
              {linkCopied ? 'Copied!' : 'Copy Invite Link'}
            </button>
          </div>
        )}

        {/* Info Note */}
        <div
          className="mt-4 p-3 rounded-xl"
          style={{ backgroundColor: COLORS.purplePale }}
        >
          <p className="text-xs" style={{ color: COLORS.purple }}>
            <strong>Note:</strong> Invited caregivers will be able to view activities,
            add memories, and see {childName}'s progress. They won't be able to change
            account settings.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InviteCaregiverModal;
