# A web platform for handling remote mentoring/supervision

_This project is proposed by [Dr. Sofiat Olaosebikan](http://www.dcs.gla.ac.uk/~sofiat/)_

# Contents

* [Project Description](#project-description)
* [Minimum Viable Product](#minimum-viable-product)
* [Mind Map for the MVP](#mind-map-for-the-mvp)
* [Entity-Relationship Diagram for the MVP](#entity-relationship-diagram-for-the-mvp)
* [Timelog](https://github.com/MehmetZorlu07/remote-mentoring/blob/master/wiki/timelog.md)
* [Weekly Plan](https://github.com/MehmetZorlu07/remote-mentoring/blob/master/wiki/plan.md)
* [Meeting Notes](https://github.com/MehmetZorlu07/remote-mentoring/blob/master/wiki/minutes.md)
* [Status Reports](https://github.com/MehmetZorlu07/remote-mentoring/blob/master/wiki/status-reports.md)
* [Questions and Ideas](https://github.com/MehmetZorlu07/remote-mentoring/blob/master/wiki/questions.md)


## Project Description 

Majority of the young researchers in developing countries are talented; however, many of them are struggling to match their skills to an application area where they can be relevant in terms of research. As a result, these young talents are underdeveloped and are unable to tackle the problems around them. To bridge this gap, the idea is to connect them with international academics for remote mentoring/supervision, so that they can learn, explore and develop their passion for research.

In this project, you will develop a web platform for handling the remote mentoring/supervision. Very broadly, the website should enable academics propose projects, and enable the young researchers create profiles highlighting their skills and interests. Other potential directions include developing and implementing an algorithm that automates the matching process based on certain criteria, integrating a cloud-based Jupyter notebook for collaborative coding, an online whiteboard, and so on.

This project extends the goals of the PWSAfrica initiative -- an international outreach supported by the School of Computing Science, University of Glasgow. For more information, see https://www.pwsafrica.org/ and https://www.gla.ac.uk/schools/computing/international/internationaloutreach/.

## Minimum Viable Product 

A web platform for handling the remote mentoring/supervision, where academics propose projects and researchers (students) apply for them.

## Features of the MVP

### Users
* Create an account by e-mail, username and password
* Login and logout
* Reset password 
...Prove ID to initiate a password reset request
...Submit a new password after clicking the link in the e-mail
* Account management 
...Edit login credentials
...Edit profile information
...(Academic) View and edit their project proposals
...(Student) View their applied/accepted projects
* (Academic) Propose a project
* (Student) Apply for a project

### Projects
* Created by academics
* Edited by academics
...details can be changed
...get deleted
* Applied by students

## Mind Map for the MVP 

![Mind Map](https://github.com/MehmetZorlu07/remote-mentoring/blob/master/wiki/images/mind-map.png)

## Entity-Relationship Diagram for the MVP

![ER](https://github.com/MehmetZorlu07/remote-mentoring/blob/master/wiki/images/remote-mentoring-ER.png)
