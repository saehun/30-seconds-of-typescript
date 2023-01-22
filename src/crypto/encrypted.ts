export const YOUTUBE_API = ((
  $0: string,
  $1: string,
  _ = require('crypto').createDecipheriv(
    'aes-256-cbc',
    Buffer.from($1.repeat(5).slice(0, 32)),
    Buffer.from($0.slice(0, 32), 'hex')
  ),
  __ = Buffer.concat([_.update(Buffer.from($0.slice(32), 'hex')), _.final()])
) =>
  JSON.parse(__.toString()) as {
    CHANNEL_ID: string;
    API_KEY: string;
  })(
  `
   CF24 3CFC 34B3 5A57 58B4 3C48 1616 34F1  D0D7 EA15 A96E 9A89 291A A22D 0F32 D1ED
   FE36 AF51 7AE7 0831 60FB D5FD 2EB5 549A  FAE9 C45F F3B8 8693 22B5 8FEE 95C1 DB2B
   96D8 221E 31BD 0C11 1E02 064B F679 2BB5  EC04 A26F B88F B625 56D6 79C3 803F E76D
   9857 C51F 161F BE5F DA61 A8F3 8E63 9948
  `.replace(/\s/g, ''),
  process.env['YOUR_SECRET_KEY']!
);
