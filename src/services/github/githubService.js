export async function getRecentCommits() {

  const owner = "AmishaK43";
  const repo = "sentinel-ai";

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch GitHub commits.");
  }

  const commits = await response.json();

  return commits.map(commit => ({

    sha: commit.sha.substring(0,7),

    message: commit.commit.message,

    author: commit.commit.author.name,

    date: commit.commit.author.date,

    url: commit.html_url

  }));

}