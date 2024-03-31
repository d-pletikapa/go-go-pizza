import { hideLoader, showLoader } from './loader.js';

export const getData = async (request) => {
  showLoader();
  try {
    const response = await fetch(`https://adorable-gem-domain.glitch.me/api/${request}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${request}`);
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error(`Error fetching ${request} ${error}`);
    return [];
  } finally {
    hideLoader();
  }
};