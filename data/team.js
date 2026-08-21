/*
  Roster for "The Team" — the committee behind the memorial project,
  transcribed from team.docx (an org-chart diagram, not flowing text).

  Displayed as a pyramid: rows of 1, 2, 4, 5 people (top to bottom, most
  senior first) rather than one row per role — a couple of rows span more
  than one title (e.g. row 2 is Chief Coordinator + Coordinator), so each
  person's own rank/title carries the meaning instead of a group label.
*/

const TT_TEAM = {
  rowSizes: [1, 2, 4, 5],
  people: [
    { rank: 'Lt Gen', name: 'W Shaibu', title: 'Chief of Army Staff',
      quals: 'NAM GSS DSO (LR) FTAM psc fdc(+) fndu(USA) CM FCM FCMH NAOOCM NAPH MSS MA MNIM' },

    { rank: 'Maj Gen', name: 'BA Alabi', title: 'Chief of Policy and Plans (A)' },
    { rank: 'Maj Gen', name: 'FU Mijinyawa', title: 'Dy COPP (A) Policy' },

    { rank: 'Brig Gen', name: 'IB Buhari', title: 'D NA Ops Centre' },
    { rank: 'Lt Col', name: 'A Lawal', title: 'NAWANI Admin' },
    { rank: 'Lt Col', name: 'A Idris', title: 'CO 199 SF Bn' },
    { rank: 'Col', name: 'I Manga', title: 'CO' },

    { rank: 'Brig Gen', name: 'Olokor (Rtd)' },
    { rank: 'Lt', name: 'A Umar', title: 'Narrator' },
    { rank: 'Mr', name: 'Faithman', title: 'Artisan' },
    { rank: 'Engr', name: 'Ifediora Paul Nwakacha', title: 'Software Engineer' },
    { rank: 'Mr', name: 'Yakubu Gaza', title: 'Video Editor' }
  ]
};
