Test Plan

**Author**: **The Asclepians**

## 1 Testing Strategy

### 1.1 Overall strategy

After the Implementation stage The QA Team will start testing by doing unit testing first, integrated testing second followed by system testing. We will create a set of test cases that ensure a high level of line coverage's.We will try to test one component at a time to insure good coverage of each component. If we upgrade or add new functionality later we may need to do regression testing on our app. The final pre-populated form app should be error free (bug Free) and meet all of our functionality requirements given in our specification design document.

### 1.2 Test Selection

We will select specific unit test to thoroughly test our methods and components for each class and during integrates test we will utilize an interactive plan to test our components.We will try out a mix of white box and black box testing .We will do edge case testing for both our system and our unit testing.Using unit test during out integration and during our system test phase we will use a comprehensive test to validate the architecture with the components of the app.We will test common and extreme cases for each method thru integration.

### 1.3 Adequacy Criterion

In order for us to get adequate testing we will rely on ore IDE coverage tool to verify we have good line coverage's .This will allow us to see the coverage of testing thru all phases unit, ingratiation and if needed regression.We can use positive test plan and add in random negative test to insure we have functionality and structure covered completely.We will also add more complex test at the different levels to confirm the test qualities are good. In addition, we will apply  __category partition__ and test the app on the boundaries as well since most of the failure of the app most likely will occur at the boundary test case.


### 1.4 Bug Tracking

We will look for and track bugs in our alpha and beta phases of testing  We will also get user acceptance testing in the real world with good error reporting we will then perform and regressive test if needed based on error reports.

### 1.5 Technology

** to do when implementation and testing is done **

## 2 Test Cases

| TestID | Test Purpose                                                            | Steps to Perform Test                                                       | Expected Results                                                           | Actual Results                           | Pass/Fail |     |
| ------ | ----------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------- | --------- | --- |
| 1      |   Test Patient ID                                                       |                   input ID and bogus ID                                     |      proper ID works                                                       |         worked as expected               |   pass    |     |
| 2      |  overflow on ID                                                         |                            See if an overflow will break api                |    No changes on application                                               |     worked as expected                   |   pass    |     |
| 3      |    retrieve patient info                                                |                 input id press submit                                       |                                                                            |      worked as expected                  |    pass   |     |
| 4      |           med get                                                       |                     local endpoint test                                     |                                                                            |     worked as expected                   |    pass   |     |
| 5      |           med post                                                      |                           local endpoint test                               |                                                                            |      worked as expected                  |    Pass   |     |
| 6      |           med put                                                       |                        local endpoint test                                  |                                                                            |      worked as expected                  |   Pass    |     |
| 7      |            drug get                                                     |                          local endpoint test                                |                                                                            |      worked as expected                  |    Pass   |     |
| 8      |              drug post                                                  |                            local endpoint test                              |                                                                            |             works as expected            |   pass    |     |
| 9      |            patient info get                                             |                          local endpoint test                                |                                                                            |      worked as expected                  |   Pass    |     |
| 10     |            patient info put                                             |                           local endpoint test                               |                                                                            |           worked as expected             |   Pass    |     |
| 11     |            medication condition get                                     |                            local endpoint test                              |                                                                            |        worked as expected                |    Pass   |     |
| 12     |           application launches deployment page                          |                   open app on georgia tech server                           |                                                                            |       worked as expected                 |    Pass   |     |
| 13     |                                                                         |                                                                             |                                                                            |      worked as expected                  |   Pass    |     |
| 14     |                                                                         |                                                                             |                                                                            |     worked as expected                   |   Pass    |     |   
| 15     |                                                                         |                                                                             |                                                                            |        worked as expected                |    Pass   |     |    
| 16     |                                                                         |                                                                             |                                                                            |       worked as expected                 |    Pass   |     |    
| 17     |                                                                         |                                                                             |                                                                            |      worked as expected                  |    Pass   |     |
| 18     |                                                                         |                                                                             |                                                                            |       worked as expected                 |   Pass    |     |
| 19     |                                                                         |                                                                             |                                                                            |        worked as expected                |   Pass    |     |
| 20     |                                                                         |                                                                             |                                                                            |       worked as expected                 |    Pass   |     |
| 21     |                                                                         |                                                                             |                                                                            |         worked as expected               |    Pass   |     |   |
| 22     |                                                                         |                                                                             |                                                                            |                                          |           |     |    |
| 23     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 24     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 25     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 26     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 27     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 28     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 29     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 30     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 31     |                                                                         |                                                                             |                                                                            |                                          |           |     |    |
| 32     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 33     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 34     |                                                                         |                                                                             |                                                                            |                                          |           |     |
| 35     |                                                                         |                                                                             |                                                                            |                                          |           |     |

**Manual Test procedures** 

**TODO once implemented ** 
 

