# Blog System Guide

This guide explains how to add new blog posts to your portfolio website.

## Overview

The blog system is built with:
- **TypeScript interfaces** for type safety
- **Static data files** for easy content management
- **Markdown support** for rich content formatting
- **Responsive design** with beautiful layouts
- **SEO optimization** with meta tags

## File Structure

```
src/
├── types/blog.ts              # TypeScript interfaces
├── data/blog-posts.ts         # Blog post data
├── components/blog/
│   ├── BlogCard.tsx          # Blog post preview cards
│   └── BlogPost.tsx          # Individual blog post display
└── app/[locale]/blog/
    ├── page.tsx              # Main blog listing page
    └── [slug]/page.tsx       # Individual blog post pages
```

## Adding a New Blog Post

### Step 1: Add Your Post Data

Edit `src/data/blog-posts.ts` and add a new post object to the `blogPosts` array:

```typescript
{
  id: "4", // Unique ID
  title: "Your Blog Post Title",
  excerpt: "A brief description of your post that appears in the preview card.",
  content: `
# Your Blog Post Title

Your full blog post content goes here. You can use **Markdown** formatting:

## Subheadings
- Bullet points
- **Bold text**
- *Italic text*
- [Links](https://example.com)

### Code Examples

\`\`\`javascript
const example = "You can include code blocks";
console.log(example);
\`\`\`

## Conclusion

Write your conclusion here.
  `,
  date: "2024-01-20", // YYYY-MM-DD format
  banner: "https://images.unsplash.com/photo-1234567890?w=1200&h=600&fit=crop", // Banner image URL
  slug: "your-blog-post-slug", // URL-friendly slug (no spaces, lowercase)
  tags: ["Tag1", "Tag2", "Tag3"], // Array of tags
  readTime: 5, // Estimated read time in minutes
  author: {
    name: "Renan Rambul",
    avatar: "/profile-picture.jpg"
  }
}
```

### Step 2: Banner Images

You have several options for banner images:

#### Option 1: Unsplash (Recommended)
Use Unsplash URLs with specific dimensions:
```
https://images.unsplash.com/photo-[ID]?w=1200&h=600&fit=crop&crop=entropy&auto=format&q=80
```

#### Option 2: Local Images
1. Add your image to `public/images/blog/`
2. Reference it as `/images/blog/your-image.jpg`

#### Option 3: External URLs
Use any external image URL (ensure it's reliable and fast-loading)

### Step 3: Content Writing Tips

#### Markdown Formatting
- Use `#` for main headings, `##` for subheadings
- Use `**bold**` for emphasis
- Use `*italic*` for subtle emphasis
- Use `` `code` `` for inline code
- Use triple backticks for code blocks:
  ```
  \`\`\`language
  your code here
  \`\`\`
  ```

#### Content Structure
1. **Introduction**: Hook the reader
2. **Main Content**: Break into digestible sections
3. **Code Examples**: Include practical examples
4. **Conclusion**: Summarize key points

### Step 4: SEO Optimization

The system automatically generates:
- **Meta titles** from your post title
- **Meta descriptions** from your excerpt
- **Open Graph tags** for social sharing
- **Structured URLs** from your slug

### Step 5: Testing

After adding your post:
1. Start the development server: `npm run dev`
2. Visit `/blog` to see your post in the listing
3. Click on your post to view the full article
4. Test on mobile devices for responsiveness

## Advanced Features

### Tags and Categories
Tags help organize your content:
- Keep tags consistent across posts
- Use 3-5 relevant tags per post
- Consider creating tag-based filtering (future enhancement)

### Read Time Calculation
Estimate read time based on:
- Average reading speed: 200-250 words per minute
- Count your words and divide by 225

### Author Information
Currently set to your profile, but the system supports:
- Multiple authors
- Author avatars
- Author bio pages (future enhancement)

## Future Enhancements

Consider adding:
- **Search functionality**
- **Tag-based filtering**
- **Related posts**
- **Comments system**
- **RSS feed**
- **Newsletter signup**
- **Social sharing buttons**

## Troubleshooting

### Common Issues

1. **Post not appearing**: Check the slug is unique and properly formatted
2. **Images not loading**: Verify image URLs are accessible
3. **Markdown not rendering**: Ensure proper markdown syntax
4. **Build errors**: Check for TypeScript errors in your post data

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify your post data matches the TypeScript interface
3. Test with a minimal post first
4. Check that all required fields are filled

## Example Post Template

```typescript
{
  id: "unique-id",
  title: "How to Build Amazing Web Applications",
  excerpt: "Learn the essential skills and tools needed to create modern web applications that users love.",
  content: `
# How to Build Amazing Web Applications

Building web applications in 2024 requires understanding modern tools and best practices.

## Essential Technologies

### Frontend
- **React/Next.js** for user interfaces
- **TypeScript** for type safety
- **Tailwind CSS** for styling

### Backend
- **Node.js** for server-side logic
- **PostgreSQL** for databases
- **Vercel** for deployment

## Best Practices

1. **Start with user needs**
2. **Design mobile-first**
3. **Optimize for performance**
4. **Test thoroughly**

## Conclusion

Building great web applications is a journey of continuous learning and improvement.
  `,
  date: "2024-01-20",
  banner: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
  slug: "how-to-build-amazing-web-applications",
  tags: ["Web Development", "React", "TypeScript", "Best Practices"],
  readTime: 7,
  author: {
    name: "Renan Rambul",
    avatar: "/profile-picture.jpg"
  }
}
```

Happy blogging! 🚀 