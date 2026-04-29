const POSTS_KEY = "blog_posts_db";
const POSTS_BACKUP_KEY = "blog_posts_db_backup";

const DEFAULT_POSTS = [
  {
    id: 1714233600001,
    title: "Welcome to the Blog App",
    content:
      "This is your starter post. Browse posts, add your own ideas, and edit drafts anytime. Use this space as your personal publishing sandbox.",
    category: "General",
    likes: 3,
  },
  {
    id: 1714233600002,
    title: "5 Frontend Habits That Save Time",
    content:
      "Small habits compound quickly: name components clearly, keep state close to where it is used, and split reusable UI early. These patterns make features easier to ship and debug.",
    category: "Technology",
    likes: 7,
  },
  {
    id: 1714233600003,
    title: "A Weekend Travel Checklist",
    content:
      "Plan light and smart: keep one essentials pouch, pre-book transport, and save offline maps before leaving. A little prep turns short trips into stress-free adventures.",
    category: "Travel",
    likes: 4,
  },
  {
    id: 1714233600004,
    title: "Healthy Morning Routine in 20 Minutes",
    content:
      "Start with water, light stretching, and a quick journal note before checking your phone. A short, repeatable routine can boost focus and make your day feel intentional.",
    category: "Lifestyle",
    likes: 5,
  },
  {
    id: 1714233600005,
    title: "Easy One-Pan Pasta for Busy Days",
    content:
      "Cook garlic, tomatoes, pasta, and broth in one pan, then finish with spinach and parmesan. You save cleanup time and still get a comforting homemade meal.",
    category: "Food",
    likes: 6,
  },
];

const mergeWithDefaultPosts = (posts = []) => {
  const existingIds = new Set(posts.map((post) => post.id));
  const missingDefaults = DEFAULT_POSTS.filter(
    (post) => !existingIds.has(post.id),
  );
  return [...posts, ...missingDefaults].map(normalizePost);
};

const canUseLocalStorage = () =>
  typeof window !== "undefined" && !!window.localStorage;

export const normalizePost = (post) => ({
  ...post,
  category: post?.category || "General",
  likes: Number.isFinite(post?.likes) ? post.likes : 0,
});

const readPostsFromKey = (key) => {
  if (!canUseLocalStorage()) return null;

  try {
    const data = localStorage.getItem(key);
    if (!data) return null;

    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed.map(normalizePost) : null;
  } catch (error) {
    console.error("Error loading posts:", error);
    return null;
  }
};

export const loadPosts = () => {
  const primaryPosts = readPostsFromKey(POSTS_KEY);
  if (primaryPosts) {
    const mergedPrimaryPosts = mergeWithDefaultPosts(primaryPosts);
    if (mergedPrimaryPosts.length !== primaryPosts.length) {
      savePosts(mergedPrimaryPosts);
    }
    return mergedPrimaryPosts;
  }

  const backupPosts = readPostsFromKey(POSTS_BACKUP_KEY);
  if (backupPosts) {
    const mergedBackupPosts = mergeWithDefaultPosts(backupPosts);
    savePosts(mergedBackupPosts);
    return mergedBackupPosts;
  }

  return mergeWithDefaultPosts();
};

export const savePosts = (posts) => {
  if (!canUseLocalStorage()) return;

  try {
    const payload = JSON.stringify(posts.map(normalizePost));
    localStorage.setItem(POSTS_KEY, payload);
    localStorage.setItem(POSTS_BACKUP_KEY, payload);
  } catch (error) {
    console.error("Error saving posts:", error);
  }
};

const LIKED_IDS_KEY = "blog_liked_post_ids";

export const loadLikedIds = () => {
  if (!canUseLocalStorage()) return [];
  try {
    const data = localStorage.getItem(LIKED_IDS_KEY);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveLikedIds = (ids) => {
  if (!canUseLocalStorage()) return;
  try {
    localStorage.setItem(LIKED_IDS_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error("Error saving liked ids:", error);
  }
};
