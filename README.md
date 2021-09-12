## Deploy to Heroku

If you followed the sensible advice above and included config/default.json and config/production.json in your .gitignore file, then pushing to Heroku will omit your config files from the push.
However, Heroku needs these files for a successful build.
So how to get them to Heroku without commiting them to GitHub?

What I suggest you do is create a local only branch, lets call it production.

git checkout -b production
We can use this branch to deploy from, with our config files.

Add the config file...

git add -f config/production.json
This will track the file in git on this branch only. DON'T PUSH THE PRODUCTION BRANCH TO GITHUB

Commit...

git commit -m 'ready to deploy'
Create your Heroku project

heroku create
And push the local production branch to the remote heroku main branch.

git push heroku production:main
Now Heroku will have the config it needs to build the project.

Don't forget to make sure your production database is not whitelisted in MongoDB Atlas, otherwise the database connection will fail and your app will crash.

After deployment you can delete the production branch if you like.

git checkout main
git branch -D production
Or you can leave it to merge and push updates from another branch.
Make any changes you need on your main branch and merge those into your production branch.

git checkout production
git merge main
Once merged you can push to heroku as above and your site will rebuild and be updated.
