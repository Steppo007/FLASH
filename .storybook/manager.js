import { addons } from 'storybook/manager-api';
import themes from './kronesTheme';

addons.setConfig({
  theme: themes.light,
  sidebar: {
    filters: {
      // can include the string 'omitFromSidebar' as a tag in a story
      patterns: (item) => {
        return !item.tags.includes('omitFromSidebar');
      },
    },
  },
});
