# [3am Commits](https://am-commits.web.app/)

Project that attempts to pull commits with curses in them from github and infinitely load them, inspired from [Commit Logs From Last Night](http://www.commitlogsfromlastnight.com/)

## How?

We run a local function that queries GitHub's API for commits containing curses and sends them to firebase. Then our frontend queries that and displays them in a nice infinite loading UI.

## Why?

This was done during a small hackathon, where the majority of the work was done around 4 days or so. I've continued adding small things because it's fun to come back to it and go "WTF, who wrote this code?... oh right, me."

## Changes if remade

I would like to preface this with, 'it was my first firebase project so I'm absolved from any responsibilities for doing stuff the correct way' but that doesn't really fly here.

With that said, I would like to have two separate databases, one for local testing and one for deployment, just like regular devops. I didn't because of a hackathon and you know, the rush, but I really regret that decision and may come back and fix that.

Another feature I would like to add is some analyitics to check like "times cursed at" and make it into a graph. Would definitely be funny to see when people are more likely to curse and if it truly is 3am.

## Development

To setup dev:

- get some keys from firebase
  - Regular client perms go in `src/firebase.js`
  - Admin perms go in `functions/admin-firebase-creds.json` (copied straight from firebase)
- get some keys from github
  - throw them in `functions/github-credentials.json` according to the sample file look-a-like

To seed and deploy

- cd into the `functions/` dir and run npm run seed, editing the seed file if you want to
- cd into the root src `./` and run `npm run start` to get the client going or `npm run deploy` to deploy

Don't be afraid to make an issue or PR if there are problems setting it up
