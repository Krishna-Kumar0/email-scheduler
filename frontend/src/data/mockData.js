export const currentUser = {
  name: 'Oliver Brown',
  email: 'oliver.brown@domain.io',
  avatar: 'OB',
}

export const senderAccounts = [
  'oliver.brown@domain.io',
  'oliver.b@reachinbox.io',
]

export const scheduledEmails = [
  {
    id: 's1',
    to: 'John Smith',
    toEmail: 'john.smith@example.com',
    subject: 'Project Timeline Update',
    preview: 'I wanted to share the updated timeline for our Q4 project...',
    scheduledFor: 'Tomorrow, 10:00 AM',
    status: 'scheduled',
    starred: false,
  },
  {
    id: 's2',
    to: 'Emily Chen',
    toEmail: 'emily.chen@techcorp.io',
    subject: 'Follow-up: Product Demo',
    preview: 'Just following up on our product demo from last week...',
    scheduledFor: 'Tomorrow, 11:00 AM',
    status: 'scheduled',
    starred: true,
  },
  {
    id: 's3',
    to: 'Marketing Team',
    toEmail: 'marketing@example.com',
    subject: 'Q4 Campaign Kickoff',
    preview: 'Please find attached the Q4 campaign brief and schedule...',
    scheduledFor: 'Tomorrow, 3:00 PM',
    status: 'scheduled',
    starred: false,
  },
  {
    id: 's4',
    to: 'David Lee',
    toEmail: 'david.lee@venture.co',
    subject: 'Introduction — ReachInbox Partnership',
    preview: 'Hi David, I hope this finds you well. I wanted to reach out...',
    scheduledFor: 'Nov 5, 9:00 AM',
    status: 'scheduled',
    starred: false,
  },
  {
    id: 's5',
    to: 'Newsletter Subscribers',
    toEmail: 'list@newsletter.io',
    subject: 'Monthly Digest — November Edition',
    preview: 'Here is your curated digest of the top articles and updates...',
    scheduledFor: 'Nov 6, 8:00 AM',
    status: 'scheduled',
    starred: false,
  },
]

export const sentEmails = [
  {
    id: 'e1',
    to: 'Sarah Wilson',
    toEmail: 'sarah.wilson@example.com',
    subject: 'Re: Project Update',
    preview: 'Thanks for the update, Sarah. Looks good!',
    sentAt: 'Nov 3, 9:45 AM',
    status: 'sent',
    starred: false,
  },
  {
    id: 'e2',
    to: 'Support',
    toEmail: 'support@example.com',
    subject: 'Issue with login',
    preview: 'I am having trouble logging in to the dashboard...',
    sentAt: 'Nov 2, 3:20 PM',
    status: 'sent',
    starred: false,
  },
  {
    id: 'e3',
    to: 'Alex Turner',
    toEmail: 'alex.turner@design.co',
    subject: 'Re: Brand Guidelines',
    preview: 'The new brand guidelines look fantastic. I especially love the...',
    sentAt: 'Nov 1, 11:12 AM',
    status: 'sent',
    starred: true,
  },
  {
    id: 'e4',
    to: 'HR Department',
    toEmail: 'hr@company.com',
    subject: 'Leave Request — Nov 10–14',
    preview: 'I would like to formally request annual leave from November 10...',
    sentAt: 'Oct 31, 4:05 PM',
    status: 'sent',
    starred: false,
  },
  {
    id: 'e5',
    to: 'Michael Torres',
    toEmail: 'michael@agency.dev',
    subject: 'Contract Review Complete',
    preview: 'I have reviewed the contract and have a few comments on section...',
    sentAt: 'Oct 30, 2:33 PM',
    status: 'sent',
    starred: false,
  },
]

export const emailDetails = {
  e1: {
    id: 'e1',
    subject: 'Oliver, hello there! | MJWYT44 BM#52W01',
    from: 'Amanda Clark',
    fromEmail: 'sender@example.com',
    fromInitial: 'A',
    fromColor: '#22c55e',
    to: 'me',
    date: 'Nov 3, 10:23 AM',
    body: [
      { type: 'text', content: 'Hey Oliver,' },
      { type: 'text', content: "You've just RECEIVED something" },
      {
        type: 'highlight',
        content: [
          '⚡ Extremely Exclusive—Only 4 Spots Worldwide Per Year | $25,000 investment ⚡',
          '⚡ To explore securing your private transformation, simply reply right now with "FLY OUT FIX" .',
        ],
      },
      { type: 'text', content: 'Your coach for world-class performance,' },
      { type: 'text', content: 'Grant' },
      {
        type: 'italic',
        content: 'P.S. Always remember that you can develop world class technique! 🚀',
      },
    ],
    attachments: [
      { name: 'Tennis_Coach_Profile.png', size: '1.2 MB' },
      { name: 'Tennis_Coach_Profile2.png', size: '1.2 MB' },
    ],
  },
  e2: {
    id: 'e2',
    subject: 'Issue with login — Support Ticket #98432',
    from: 'Support Team',
    fromEmail: 'support@example.com',
    fromInitial: 'S',
    fromColor: '#3b82f6',
    to: 'me',
    date: 'Nov 2, 3:20 PM',
    body: [
      { type: 'text', content: 'Hi Oliver,' },
      { type: 'text', content: 'Thank you for reaching out! We received your request and our team is looking into the login issue right away.' },
      { type: 'text', content: 'We will get back to you within 24 hours.' },
      { type: 'text', content: 'Best regards,' },
      { type: 'text', content: 'The Support Team' },
    ],
    attachments: [],
  },
}

export const sendLaterOptions = [
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: 'Tomorrow, 10:00 AM', value: 'tomorrow-10am' },
  { label: 'Tomorrow, 11:00 AM', value: 'tomorrow-11am' },
  { label: 'Tomorrow, 3:00 PM', value: 'tomorrow-3pm' },
]
