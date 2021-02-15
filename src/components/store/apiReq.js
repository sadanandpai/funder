export let jokesAPIPageNumber = 1;
let isRequestInProgress = false;

export function setJokesAPIPageNumber(pageNo) {
  jokesAPIPageNumber = pageNo;
}

export async function fetchJokesFromAPI() {
  if (!isRequestInProgress) {
    try {
      const response = await fetch(`https://icanhazdadjoke.com/search?page=${jokesAPIPageNumber}`, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      jokesAPIPageNumber = data.next_page !== data.total_pages ? data.next_page : 1;
      return data.results;
    } catch (error) {
      console.warn(error);
      return null;
    } finally {
      isRequestInProgress = false;
    }
  }
}

export async function fetchImage() {
  try {
    const response = await fetch("https://source.unsplash.com/random/400x600", {
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}
