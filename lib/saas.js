export const saasItems = [
  ['login', 'Login', 'Authentication', 'A warm welcome back.', 'Email validation, password reveal and an animated sign-in state.', 'Login'],
  ['signup', 'Sign Up', 'Authentication', 'Your next big idea starts here.', 'Create an account with live password strength and terms validation.', 'Signup'],
  ['forgot-password', 'Forgot Password', 'Authentication', 'A little help getting back in.', 'An email recovery form with a clear confirmation state.', 'ForgotPassword'],
  ['reset-password', 'Reset Password', 'Authentication', 'A fresh start. A stronger password.', 'Live strength feedback, matching passwords and a glowing success state.', 'ResetPassword'],
  ['verification', 'Verification Code', 'Authentication', 'One last step. All yours.', 'A six-digit verification flow with paste support and resend countdown.', 'Verification'],
  ['dashboard', 'Dashboard', 'Workspace', 'Your business, at a glance.', 'Switch reporting periods and watch revenue, metrics and charts respond.', 'Dashboard'],
  ['sidebar', 'Sidebar', 'Navigation', 'Everything in its right place.', 'Collapsible workspace navigation with animated active states.', 'Sidebar'],
  ['header', 'App Header', 'Navigation', 'A command center above it all.', 'Search shortcuts, notifications and an interactive account menu.', 'Header'],
  ['footer', 'Footer', 'Navigation', 'Make the last impression count.', 'A newsletter signup, component links and a soft aurora glow.', 'Footer'],
  ['pricing', 'Pricing Plans', 'Billing', 'Room for your next chapter.', 'Monthly and annual pricing with a responsive plan selection.', 'Pricing'],
  ['billing', 'Billing & Invoices', 'Billing', 'Every detail, accounted for.', 'Browse paid invoices and download a demo invoice as a text file.', 'Billing'],
  ['team', 'Team Members', 'Workspace', 'Better, together.', 'Invite teammates, filter the roster and manage member roles.', 'Team'],
  ['notifications', 'Notification Center', 'Workspace', 'Stay in the loop.', 'Filter unread updates, mark them as read and clear your inbox.', 'Notifications'],
  ['settings', 'Account Settings', 'Workspace', 'A workspace that feels like you.', 'Edit your profile and save notification preferences in this session.', 'Settings'],
  ['command-menu', 'Command Menu', 'Navigation', 'Less searching. More doing.', 'A keyboard-friendly command palette that searches all 20 components.', 'CommandMenu'],
  ['file-upload', 'File Upload', 'Workspace', 'Drop something brilliant.', 'Drag-and-drop files, validate size and preview a local upload queue.', 'FileUpload'],
  ['integrations', 'Integrations', 'Workspace', 'Your favorite tools. Connected.', 'Search integrations and toggle their demo connection states.', 'Integrations'],
  ['activity', 'Activity Feed', 'Workspace', 'See the story unfold.', 'Filter a live-style activity timeline and add a new demo event.', 'Activity'],
  ['onboarding', 'Onboarding', 'Workspace', 'From hello to ready to go.', 'A guided three-step workspace setup with animated progress.', 'Onboarding'],
  ['usage', 'Usage & Limits', 'Billing', 'Know your headroom.', 'Interactive usage meters with plan switching and simulated usage.', 'Usage'],
].map(([slug, title, category, kicker, blurb, component], index) => ({ slug, title, category, kicker, blurb, component, no: String(index + 31) }));

export function getSaasItem(slug) {
  return saasItems.find(item => item.slug === slug);
}
