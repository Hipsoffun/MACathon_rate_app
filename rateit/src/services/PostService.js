import * as FileSystem from 'expo-file-system';

const DATABASE_PATH = FileSystem.documentDirectory + 'posts.json';

export default class PostService {

    static async deleteDatabase() {
        try {
            const fileInfo = await FileSystem.getInfoAsync(DATABASE_PATH);
            if (fileInfo.exists) {
                await FileSystem.deleteAsync(DATABASE_PATH);
                console.log('Database file has been deleted');
            }
            return true;
        } catch (error) {
            console.error('Error deleting database file:', error);
            throw new Error('Failed to delete database file');
        }
    }

    static async loadPosts() {
        try {
            const fileInfo = await FileSystem.getInfoAsync(DATABASE_PATH);

            if (!fileInfo.exists) {
                // If file doesn't exist, create it with empty array
                await FileSystem.writeAsStringAsync(DATABASE_PATH, JSON.stringify([]));
                return [];
            } else {
                // Read posts from file
                const postsData = await FileSystem.readAsStringAsync(DATABASE_PATH);
                return JSON.parse(postsData);
            }
        } catch (error) {
            console.error('Error loading posts:', error);
            throw new Error('Failed to load posts');
        }
    }

    static async savePosts(posts) {
        try {
            await FileSystem.writeAsStringAsync(DATABASE_PATH, JSON.stringify(posts));
        } catch (error) {
            console.error('Error saving posts:', error);
            throw new Error('Failed to save posts');
        }
    }

    // static async createPost(title, rating,content) {
    //     try {
    //         const posts = await this.loadPosts();

    //         const newPost = {
    //             id: Date.now().toString(),
    //             title: title.trim(),
    //             rating: rating || 0,
    //             content: content.trim(),
    //             createdAt: new Date().toISOString(),
    //         };

    //         const updatedPosts = [...posts, newPost];
    //         await this.savePosts(updatedPosts);

    //         return newPost;
    //     } catch (error) {
    //         console.error('Error creating post:', error);
    //         throw new Error('Failed to create post');
    //     }
    // }

    // new one with image
    static async createPost(title, rating, content, image) {
        try {
            const posts = await this.loadPosts();

            const newPost = {
                id: Date.now().toString(),
                title: title.trim(),
                rating: rating || 0,
                content: content.trim(),
                image: image || null,  // Store image URI if provided
                createdAt: new Date().toISOString(),
            };

            const updatedPosts = [...posts, newPost];
            await this.savePosts(updatedPosts);

            return newPost;
        } catch (error) {
            console.error('Error creating post:', error);
            throw new Error('Failed to create post');
        }
    }


    static async migrateData() {
        try {
          const posts = await this.loadPosts();
          
          // Add rating field to any posts that don't have it
          const migratedPosts = posts.map(post => {
            if (post.rating === undefined) {
              return { ...post, rating: 0 };
            }
            return post;
          });
          
          // Only save if there were changes
          if (JSON.stringify(posts) !== JSON.stringify(migratedPosts)) {
            await this.savePosts(migratedPosts);
          }
        } catch (error) {
          console.error('Data migration failed:', error);
        }
      }
}