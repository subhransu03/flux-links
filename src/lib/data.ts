
import type { Category, Shortcut, Theme, Animation } from './types';

export const THEMES: Theme[] = [
    { name: 'Default', value: 'default' },
    { name: 'Oasis', value: 'oasis' },
    { name: 'Synthwave', value: 'synthwave' },
    { name: 'Crimson', value: 'crimson' },
    { name: 'Forest', value: 'forest' },
    { name: 'Ocean', value: 'ocean' },
    { name: 'Neumorphism', value: 'neumorphism' },
    { name: 'Glassmorphism', value: 'glassmorphism' },
    { name: 'Cyberpunk', value: 'cyberpunk' },
    { name: 'Minimalist', value: 'minimalist' },
];

export const ANIMATIONS: Animation[] = [
  { name: 'Off', value: 'off' },
  { name: 'Moving Gradient', value: 'gradient' },
  { name: 'Gentle Particles', value: 'particles' },
  { name: 'Interactive Spotlight', value: 'spotlight' },
  { name: 'Moving Lines', value: 'lines' },
  { name: 'Polka Dots', value: 'polka' },
  { name: 'Floating Cubes', value: 'cubes' },
];


export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Job Portals' },
  { id: 'cat-2', name: 'Remote Job Portals' },
  { id: 'cat-3', name: 'Coding Platforms' },
  { id: 'cat-4', name: 'Learning Platforms' },
  { id: 'cat-5', name: 'Cyber Security' },
  { id: 'cat-6', name: 'Work Collaboration / Productivity Tools' },
  { id: 'cat-7', name: 'AI Tools' },
  { id: 'cat-8', name: 'Image Resizers / Editors' },
];

export const DEFAULT_SHORTCUTS: Shortcut[] = [
  { id: 'sc-1', name: 'LinkedIn', url: 'https://linkedin.com', categoryId: 'cat-1' },
  { id: 'sc-2', name: 'Internshala', url: 'https://internshala.com', categoryId: 'cat-1' },
  { id: 'sc-3', name: 'AngelList Talent', url: 'https://angel.co', categoryId: 'cat-1' },
  { id: 'sc-4', name: 'Hirect', url: 'https://hirect.in', categoryId: 'cat-1' },
  { id: 'sc-5', name: 'CutShort', url: 'https://cutshort.io', categoryId: 'cat-1' },
  { id: 'sc-6', name: 'Instahyre', url: 'https://instahyre.com', categoryId: 'cat-1' },
  { id: 'sc-7', name: 'Naukri', url: 'https://naukri.com', categoryId: 'cat-1' },
  { id: 'sc-8', name: 'Indeed', url: 'https://indeed.com', categoryId: 'cat-1' },
  { id: 'sc-9', name: 'Glassdoor', url: 'https://glassdoor.com', categoryId: 'cat-1' },
  { id: 'sc-10', name: 'Monster', url: 'https://monster.com', categoryId: 'cat-1' },
  { id: 'sc-11', name: 'CareerBuilder', url: 'https://careerbuilder.com', categoryId: 'cat-1' },
  { id: 'sc-12', name: 'SimplyHired', url: 'https://simplyhired.com', categoryId: 'cat-1' },
  { id: 'sc-13', name: 'Job.com', url: 'https://job.com', categoryId: 'cat-1' },
  { id: 'sc-14', name: 'Shine', url: 'https://shine.com', categoryId: 'cat-1' },
  { id: 'sc-15', name: 'Freshersworld', url: 'https://freshersworld.com', categoryId: 'cat-1' },
  { id: 'sc-16', name: 'WorkIndia', url: 'https://workindia.in', categoryId: 'cat-1' },
  { id: 'sc-17', name: 'TimesJobs', url: 'https://timesjobs.com', categoryId: 'cat-1' },
  { id: 'sc-18', name: 'Turing', url: 'https://turing.com', categoryId: 'cat-1' },
  { id: 'sc-19', name: 'FlexJobs', url: 'https://flexjobs.com', categoryId: 'cat-1' },
  { id: 'sc-20', name: 'Jooble', url: 'https://jooble.org', categoryId: 'cat-1' },
  { id: 'sc-21', name: 'HackerRank Jobs', url: 'https://www.hackerrank.com/jobs', categoryId: 'cat-1' },
  { id: 'sc-22', name: 'ZipRecruiter', url: 'https://ziprecruiter.com', categoryId: 'cat-1' },
  { id: 'sc-23', name: 'Dribbble Jobs', url: 'https://dribbble.com/jobs', categoryId: 'cat-1' },
  { id: 'sc-24', name: 'Remotive', url: 'https://remotive.io/jobs', categoryId: 'cat-1' },
  { id: 'sc-25', name: 'Remotive', url: 'https://remotive.io', categoryId: 'cat-2' },
  { id: 'sc-26', name: 'We Work Remotely', url: 'https://weworkremotely.com', categoryId: 'cat-2' },
  { id: 'sc-27', name: 'Remote OK', url: 'https://remoteok.io', categoryId: 'cat-2' },
  { id: 'sc-28', name: 'AngelList Talent', url: 'https://angel.co', categoryId: 'cat-2' },
  { id: 'sc-29', name: 'Jobspresso', url: 'https://jobspresso.co', categoryId: 'cat-2' },
  { id: 'sc-30', name: 'Toptal', url: 'https://toptal.com', categoryId: 'cat-2' },
  { id: 'sc-31', name: 'Working Nomads', url: 'https://workingnomads.co/jobs', categoryId: 'cat-2' },
  { id: 'sc-32', name: 'Outsourcely', url: 'https://outsourcely.com', categoryId: 'cat-2' },
  { id: 'sc-33', name: 'Remote.co', url: 'https://remote.co', categoryId: 'cat-2' },
  { id: 'sc-34', name: 'Hubstaff Talent', url: 'https://talent.hubstaff.com', categoryId: 'cat-2' },
  { id: 'sc-35', name: 'JustRemote', url: 'https://justremote.co', categoryId: 'cat-2' },
  { id: 'sc-36', name: 'SkipTheDrive', url: 'https://skipthedrive.com', categoryId: 'cat-2' },
  { id: 'sc-37', name: 'Pangian', url: 'https://pangian.com', categoryId: 'cat-2' },
  { id: 'sc-38', name: 'PeoplePerHour', url: 'https://peopleperhour.com', categoryId: 'cat-2' },
  { id: 'sc-39', name: 'Crossover', url: 'https://crossover.com', categoryId: 'cat-2' },
  { id: 'sc-40', name: 'CloudDevs', url: 'https://clouddevs.com', categoryId: 'cat-2' },
  { id: 'sc-41', name: 'Arc', url: 'https://arc.dev', categoryId: 'cat-2' },
  { id: 'sc-42', name: 'Gun.io', url: 'https://gun.io', categoryId: 'cat-2' },
  { id: 'sc-43', name: 'Workew', url: 'https://workew.com', categoryId: 'cat-2' },
  { id: 'sc-44', name: 'RemoteLeads', url: 'https://remoteleads.io', categoryId: 'cat-2' },
  { id: 'sc-45', name: 'GitHub', url: 'https://github.com', categoryId: 'cat-3' },
  { id: 'sc-46', name: 'GitLab', url: 'https://gitlab.com', categoryId: 'cat-3' },
  { id: 'sc-47', name: 'HackerRank', url: 'https://hackerrank.com', categoryId: 'cat-3' },
  { id: 'sc-48', name: 'LeetCode', url: 'https://leetcode.com', categoryId: 'cat-3' },
  { id: 'sc-49', name: 'CodeChef', url: 'https://codechef.com', categoryId: 'cat-3' },
  { id: 'sc-50', name: 'GeeksforGeeks', url: 'https://geeksforgeeks.org', categoryId: 'cat-3' },
  { id: 'sc-51', name: 'Codeforces', url: 'https://codeforces.com', categoryId: 'cat-3' },
  { id: 'sc-52', name: 'TopCoder', url: 'https://topcoder.com', categoryId: 'cat-3' },
  { id: 'sc-53', name: 'Coderbyte', url: 'https://coderbyte.com', categoryId: 'cat-3' },
  { id: 'sc-54', name: 'Exercism', url: 'https://exercism.io', categoryId: 'cat-3' },
  { id: 'sc-55', name: 'InterviewBit', url: 'https://interviewbit.com', categoryId: 'cat-3' },
  { id: 'sc-56', name: 'Project Euler', url: 'https://projecteuler.net', categoryId: 'cat-3' },
  { id: 'sc-57', name: 'SPOJ', url: 'https://spoj.com', categoryId: 'cat-3' },
  { id: 'sc-58', name: 'Hackerearth', url: 'https://hackerearth.com', categoryId: 'cat-3' },
  { id: 'sc-59', name: 'Coding Ninjas', url: 'https://codingninjas.com', categoryId: 'cat-3' },
  { id: 'sc-60', name: 'CS50', url: 'https://cs50.harvard.edu', categoryId: 'cat-3' },
  { id: 'sc-61', name: 'Codewars', url: 'https://www.codewars.com', categoryId: 'cat-3' },
  { id: 'sc-62', name: 'Edabit', url: 'https://edabit.com', categoryId: 'cat-3' },
  { id: 'sc-63', name: 'Replit', url: 'https://replit.com', categoryId: 'cat-3' },
  { id: 'sc-64', name: 'Programiz', url: 'https://programiz.com', categoryId: 'cat-3' },
  { id: 'sc-65', name: 'Coursera', url: 'https://coursera.org', categoryId: 'cat-4' },
  { id: 'sc-66', name: 'edX', url: 'https://edx.org', categoryId: 'cat-4' },
  { id: 'sc-67', name: 'Udemy', url: 'https://udemy.com', categoryId: 'cat-4' },
  { id: 'sc-68', name: 'Khan Academy', url: 'https://khanacademy.org', categoryId: 'cat-4' },
  { id: 'sc-69', name: 'Skillshare', url: 'https://skillshare.com', categoryId: 'cat-4' },
  { id: 'sc-70', name: 'Pluralsight', url: 'https://pluralsight.com', categoryId: 'cat-4' },
  { id: 'sc-71', name: 'LinkedIn Learning', url: 'https://linkedin.com/learning', categoryId: 'cat-4' },
  { id: 'sc-72', name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu', categoryId: 'cat-4' },
  { id: 'sc-73', name: 'Codecademy', url: 'https://codecademy.com', categoryId: 'cat-4' },
  { id: 'sc-74', name: 'freeCodeCamp', url: 'https://freecodecamp.org', categoryId: 'cat-4' },
  { id: 'sc-75', name: 'Brilliant', url: 'https://brilliant.org', categoryId: 'cat-4' },
  { id: 'sc-76', name: 'SoloLearn', url: 'https://sololearn.com', categoryId: 'cat-4' },
  { id: 'sc-77', name: 'FutureLearn', url: 'https://futurelearn.com', categoryId: 'cat-4' },
  { id: 'sc-78', name: 'W3Schools', url: 'https://w3schools.com', categoryId: 'cat-4' },
  { id: 'sc-79', name: 'The Odin Project', url: 'https://theodinproject.com', categoryId: 'cat-4' },
  { id: 'sc-80', name: 'DataCamp', url: 'https://datacamp.com', categoryId: 'cat-4' },
  { id: 'sc-81', name: 'Springboard', url: 'https://springboard.com', categoryId: 'cat-4' },
  { id: 'sc-82', name: 'Udacity', url: 'https://udacity.com', categoryId: 'cat-4' },
  { id: 'sc-83', name: 'CS50', url: 'https://cs50.harvard.edu', categoryId: 'cat-4' },
  { id: 'sc-84', name: 'Alison', url: 'https://alison.com', categoryId: 'cat-4' },
  { id: 'sc-85', name: 'Hack The Box', url: 'https://hackthebox.com', categoryId: 'cat-5' },
  { id: 'sc-86', name: 'TryHackMe', url: 'https://tryhackme.com', categoryId: 'cat-5' },
  { id: 'sc-87', name: 'Offensive Security', url: 'https://www.offensive-security.com', categoryId: 'cat-5' },
  { id: 'sc-88', name: 'PentesterLab', url: 'https://pentesterlab.com', categoryId: 'cat-5' },
  { id: 'sc-89', name: 'HackThisSite', url: 'https://hackthissite.org', categoryId: 'cat-5' },
  { id: 'sc-90', name: 'OverTheWire', url: 'https://overthewire.org', categoryId: 'cat-5' },
  { id: 'sc-91', name: 'Root Me', url: 'https://root-me.org', categoryId: 'cat-5' },
  { id: 'sc-92', name: 'CISA', url: 'https://cisa.gov', categoryId: 'cat-5' },
  { id: 'sc-93', name: 'Kali Linux', url: 'https://www.kali.org', categoryId: 'cat-5' },
  { id: 'sc-94', name: 'Cybrary', url: 'https://cybrary.it', categoryId: 'cat-5' },
  { id: 'sc-95', name: 'Blue Team Labs Online', url: 'https://blueteamlabs.online', categoryId: 'cat-5' },
  { id: 'sc-96', name: 'OWASP', url: 'https://owasp.org', categoryId: 'cat-5' },
  { id: 'sc-97', name: 'VulnHub', url: 'https://vulnhub.com', categoryId: 'cat-5' },
  { id: 'sc-98', name: 'SecurityTrails', url: 'https://securitytrails.com', categoryId: 'cat-5' },
  { id: 'sc-99', name: 'Packet Storm', url: 'https://packetstormsecurity.com', categoryId: 'cat-5' },
  { id: 'sc-100', name: 'PortSwigger', url: 'https://portswigger.net/web-security', categoryId: 'cat-5' },
  { id: 'sc-101', name: 'Bugcrowd', url: 'https://bugcrowd.com', categoryId: 'cat-5' },
  { id: 'sc-102', name: 'Synack', url: 'https://synack.com', categoryId: 'cat-5' },
  { id: 'sc-103', name: 'HackerOne', url: 'https://hackerone.com', categoryId: 'cat-5' },
  { id: 'sc-104', name: 'Infosec Institute', url: 'https://resources.infosecinstitute.com', categoryId: 'cat-5' },
  { id: 'sc-105', name: 'Slack', url: 'https://slack.com', categoryId: 'cat-6' },
  { id: 'sc-106', name: 'Trello', url: 'https://trello.com', categoryId: 'cat-6' },
  { id: 'sc-107', name: 'Asana', url: 'https://asana.com', categoryId: 'cat-6' },
  { id: 'sc-108', name: 'ClickUp', url: 'https://clickup.com', categoryId: 'cat-6' },
  { id: 'sc-109', name: 'Notion', url: 'https://notion.so', categoryId: 'cat-6' },
  { id: 'sc-110', name: 'Microsoft Teams', url: 'https://teams.microsoft.com', categoryId: 'cat-6' },
  { id: 'sc-111', name: 'Google Workspace', url: 'https://workspace.google.com', categoryId: 'cat-6' },
  { id: 'sc-112', name: 'Zoom', url: 'https://zoom.us', categoryId: 'cat-6' },
  { id: 'sc-113', name: 'Miro', url: 'https://miro.com', categoryId: 'cat-6' },
  { id: 'sc-114', name: 'Figma', url: 'https://figma.com', categoryId: 'cat-6' },
  { id: 'sc-115', name: 'Basecamp', url: 'https://basecamp.com', categoryId: 'cat-6' },
  { id: 'sc-116', name: 'Airtable', url: 'https://airtable.com', categoryId: 'cat-6' },
  { id: 'sc-117', name: 'Monday.com', url: 'https://monday.com', categoryId: 'cat-6' },
  { id: 'sc-118', name: 'Evernote', url: 'https://evernote.com', categoryId: 'cat-6' },
  { id: 'sc-119', name: 'Loom', url: 'https://loom.com', categoryId: 'cat-6' },
  { id: 'sc-120', name: 'Dropbox', url: 'https://dropbox.com', categoryId: 'cat-6' },
  { id: 'sc-121', name: 'Grammarly', url: 'https://grammarly.com', categoryId: 'cat-6' },
  { id: 'sc-122', name: 'Calendly', url: 'https://calendly.com', categoryId: 'cat-6' },
  { id: 'sc-123', name: 'Clockify', url: 'https://clockify.me', categoryId: 'cat-6' },
  { id: 'sc-124', name: 'Zapier', url: 'https://zapier.com', categoryId: 'cat-6' },
  { id: 'sc-125', name: 'ChatGPT', url: 'https://chat.openai.com', categoryId: 'cat-7' },
  { id: 'sc-126', name: 'Notion AI', url: 'https://www.notion.so/product/ai', categoryId: 'cat-7' },
  { id: 'sc-127', name: 'Copy.ai', url: 'https://copy.ai', categoryId: 'cat-7' },
  { id: 'sc-128', name: 'Jasper', url: 'https://jasper.ai', categoryId: 'cat-7' },
  { id: 'sc-129', name: 'Writesonic', url: 'https://writesonic.com', categoryId: 'cat-7' },
  { id: 'sc-130', name: 'Quillbot', url: 'https://quillbot.com', categoryId: 'cat-7' },
  { id: 'sc-131', name: 'GrammarlyGO', url: 'https://grammarly.com/go', categoryId: 'cat-7' },
  { id: 'sc-132', name: 'Claude', url: 'https://claude.ai', categoryId: 'cat-7' },
  { id: 'sc-133', name: 'Bard', url: 'https://bard.google.com', categoryId: 'cat-7' },
  { id: 'sc-134', name: 'Perplexity', url: 'https://perplexity.ai', categoryId: 'cat-7' },
  { id: 'sc-135', name: 'RunwayML', url: 'https://runwayml.com', categoryId: 'cat-7' },
  { id: 'sc-136', name: 'Synthesia', url: 'https://synthesia.io', categoryId: 'cat-7' },
  { id: 'sc-137', name: 'Pictory', url: 'https://pictory.ai', categoryId: 'cat-7' },
  { id: 'sc-138', name: 'Murf.ai', url: 'https://murf.ai', categoryId: 'cat-7' },
  { id: 'sc-139', name: 'DeepL Write', url: 'https://www.deepl.com/write', categoryId: 'cat-7' },
  { id: 'sc-140', name: 'Cleanup.pictures', url: 'https://cleanup.pictures', categoryId: 'cat-7' },
  { id: 'sc-141', name: 'Scribe AI', url: 'https://scribehow.com', categoryId: 'cat-7' },
  { id: 'sc-142', name: 'Fireflies AI', url: 'https://fireflies.ai', categoryId: 'cat-7' },
  { id: 'sc-143', name: 'Eightify', url: 'https://eightify.app', categoryId: 'cat-7' },
  { id: 'sc-144', name: 'Magical AI', url: 'https://magical.so', categoryId: 'cat-7' },
  { id: 'sc-145', name: 'Image Resizer', url: 'https://imageresizer.com', categoryId: 'cat-8' },
  { id: 'sc-146', name: 'ResizeImage.net', url: 'https://resizeimage.net', categoryId: 'cat-8' },
  { id: 'sc-147', name: 'Pixlr', url: 'https://pixlr.com', categoryId: 'cat-8' },
  { id: 'sc-148', name: 'Fotor', url: 'https://fotor.com', categoryId: 'cat-8' },
  { id: 'sc-149', name: 'Canva', url: 'https://canva.com', categoryId: 'cat-8' },
  { id: 'sc-150', name: 'Adobe Express', url: 'https://express.adobe.com', categoryId: 'cat-8' },
  { id: 'sc-151', name: 'Photopea', url: 'https://photopea.com', categoryId: 'cat-8' },
  { id: 'sc-152', name: 'ILoveIMG', url: 'https://iloveimg.com', categoryId: 'cat-8' },
  { id: 'sc-153', name: 'Befunky', url: 'https://befunky.com', categoryId: 'cat-8' },
  { id: 'sc-154', name: 'LunaPic', url: 'https://lunapic.com', categoryId: 'cat-8' },
  { id: 'sc-155', name: 'PineTools Resize', url: 'https://pinetools.com/resize-image', categoryId: 'cat-8' },
  { id: 'sc-156', name: 'Kapwing', url: 'https://kapwing.com', categoryId: 'cat-8' },
  { id: 'sc-157', name: 'Remove.bg', url: 'https://remove.bg', categoryId: 'cat-8' },
  { id: 'sc-158', name: 'BulkResizePhotos', url: 'https://bulkresizephotos.com', categoryId: 'cat-8' },
  { id: 'sc-159', name: 'Simple Image Resizer', url: 'https://simpleimageresizer.com', categoryId: 'cat-8' },
  { id: 'sc-160', name: 'Img2Go', url: 'https://img2go.com', categoryId: 'cat-8' },
  { id: 'sc-161', name: 'ResizePixel', url: 'https://resizepixel.com', categoryId: 'cat-8' },
  { id: 'sc-162', name: 'Online Image Editor', url: 'https://online-image-editor.com', categoryId: 'cat-8' },
  { id: 'sc-163', name: 'Croppola', url: 'https://croppola.com', categoryId: 'cat-8' },
  { id: 'sc-164', name: 'PhotoResizer.com', url: 'https://photoresizer.com', categoryId: 'cat-8' },
];
