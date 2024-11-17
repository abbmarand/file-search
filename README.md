# This was part of a school project and I was given 40 hours to work on it.
The documentation is just something that was required.

# Replace human based support with AI
Human based support is the most common if you count away people searching for information on the internet.
Alltough this is a task which could easily be replaced by AI and give the people that work in support a more fulfilling job.

# How will it be done
The idea is to not make a non-preparatory solution. This meaning that any company or person could start using the AI with thier own companies policies and standards.
How to make this work is to make the users able to upload thier files with the information required for support. 
(many organizations have this kind of documentation)

# On the technical side
On the technical side I am planning the project to consist of 3 main parts
- The backend with a database
- An AI server which the main backend communicates to
- A frontend which can communicate to the backend

**Here is an example on how it would work for the user providing support**
1. User enters the website and creates an account (maybe use Oauth)
2. User uploads files
3. Files gets processed
4. the support AI is now avaleble (maybe make the organization able to interact with an API or just use it on the website)

**Here is an example on how it would work for someone looking for support**
1. User enters the website or the support provider org
2. user asks support
3. api gets prompted
4. user gets answer

**The reason I decided to not have the AI API and the DB API on the same server and language**
- Pyton performance compared to typescript
- experience in python servers compared to node
- documentation (as node servers are widely more used)
- package management (if to export the server to the cloud, pythons package management is significantly worse as it doesn't have any lockfiles meaning manual installation instead of "npm i")
