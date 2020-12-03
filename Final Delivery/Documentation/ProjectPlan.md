# Project Plan



**Author**: The-asclepians

## 1 Introduction

*The team will work on Patient facing pre-populated intake forms .These forms are the forms a patient fills out prior to an office or tele-med visit for the doctor listing pre-existing conditions and medical history.*

## 2 Process Description

*Mentor Questions *

1. For the tele-health portion, do we have to integrate with a specific telehealth app/service or we're just gonna mock that?
2. Will the user be able to override the data pulled from their records before submitting the form?
3. If the user overrides the data or adds new data their didn't previously provide and submits the form, should we push the updated data to the external services where we collected the original data from?
4. If the user doesn't want to share some or all of their historical data with a healthcare provider should they be able to do that?
5. What if there is conflicting data? How to reconcile?
6. I guess we are going to create a front end for the UI and a back end for retrieving and storing records.
7. Re: questions #2 and 3:  If the user overrides past data, perhaps we create a report that flags the Update for the intake person to review.  Also, we probably want to maintain the history of changes as an audit trail.
8. I presume the following:
   -  Patient makes an appt with Dr
   -  Dr sends a link to their email.
   -  Form is pre-populated with data drawn from some source.
   -  Question:  what might the source be.
9.	Could there be more than one data source we'd use to populate the form?
10.	What will function as the unique key?
11.	Are intake forms a standardized format?

## 3 Team

*Describe the team and their roles (there may be more roles than there are team members)*

- Marouane Marzouki ([mmarzouki3@gatech.edu](mailto:mmarzouki3@gatech.edu))
- Matthew Kalita ([mkalita6@gatech.edu](mailto:mkalita6@gatech.edu))
- Ed Hayes ([ehayes9@gatech.edu](mailto:ehayes9@gatech.edu))
- Anthony Bosshardt ([abosshardt6@gatech.edu](mailto:abosshardt6@gatech.edu))
- Parul Khosla ([pkhosla3@gatech.edu](mailto:pkhosla3@gatech.edu))
- -------------------------------------------------------------
- Project Manager 
  * Organize the development of the project 
  * Set team meetings and agendas 
  * Set tasks for specific members of the team 
  * Activity Planning and Sequencing.
  * Resource Planning
  * Developing Schedules
- Developer 
    * Collaborating with PM , Mentor and Team to identify end-user requirements and specifications
    * Either work on front-end ,back-end or full stack in development process
    * Produce efficient and elegant code based on requirements
    * Developing technical documentation for use of system and to guide future software development of project
- QA Quality Assurance   
    * Collaborate with the  Development team to ensure consistent project execution
    * Test current product and identifying deficiencies
    * Suggest solutions to identified product problems
    * Creating detailed, comprehensive and well-structured test plans and test cases
    * Reviewing quality specifications and technical design documents to provide timely and meaningful feedback

- *Table showing which team member(s) has which role(s)*

| Role         | Team Member               |
|--------------|---------------------------|
| PM           | Marouen Marzouki          |
| Developer    | Anthony Bosshardt         |
| Developer    | Daniel Arch               |
| Developer    | Ed Hayes                  |
| Developer/QA | Parul Khosla              |
| QA           | Matthew Kalita            |
| Mentor       | Elizabeth (Ellie) Shivers |
