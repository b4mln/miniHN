# miniHN

This is a tiny-mini **Hacker News** clone, allowing only Posts to be created and updated, upvoted or downvoted.

## Running

A docker-compose yaml is provided to bootstrap the project, so all is needed is simply *compose up*.

## Usage

The project only exposes an API interface. API docs can be found in a *Swagger* interface, accessible at: 
<http://localhost:3000/api-docs/>

The system is user-based, and actions (other than viewing content) requires being logged-on to the system. 
To get a user, one can register with **user/register**

All authenticated end-points require a token to be used. A token is returned upon login from **user/login**.

## Ranking Algorithm

This project uses the original HN ranking algorithm, as described [here](https://medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d)