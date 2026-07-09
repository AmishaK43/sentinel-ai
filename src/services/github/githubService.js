export async function getLatestCommit() {

  const owner = "AmishaK43";
  const repo = "sentinel-ai";

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch GitHub commits.");
  }

  const commits = await response.json();

  const latest = commits[0];

  return {
    sha: latest.sha.substring(0, 7),

    message: latest.commit.message,

    author: latest.commit.author.name,

    date: latest.commit.author.date,

    url: latest.html_url,
  };

}