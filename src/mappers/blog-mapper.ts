import type { BlogPost, Event } from '@/interfaces';

export class BlogMapper {
  static toEvent(blogEntity: BlogPost): Event {
    return {
      id: `blog-${blogEntity.slug}`,
      type: 'BlogPostEvent',
      created_at: blogEntity.publishDate,
      public: true,
      actor: {
        id: 0,
        login: 'duquejo/duquejo-cv-next',
        display_login: 'José Duque',
        gravatar_id: '',
        url: '',
        avatar_url: 'https://avatars.githubusercontent.com/u/47703424',
      },
      repo: {
        id: 0,
        name: 'duquejo/duquejo-cv-next',
        url: `/blog/${blogEntity.slug}`,
      },
      payload: {
        ref: 'blog',
        blog_slug: blogEntity.slug,
        blog_title: blogEntity.title,
        description: blogEntity.excerpt,
        blog_category: blogEntity.category,
        blog_tags: blogEntity.tags,
      },
    };
  }
}
