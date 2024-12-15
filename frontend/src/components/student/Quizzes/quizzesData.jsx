  const quizzesData = {
    'Automation Testing': [
      {
        title: 'Quiz 1',
        dueDate: '12/15/24',
        teacherInstructions: 'All answers must be in uppercase letters.',
        questions: [
          { question: 'What is Automation Testing?', type: 'text' },
          { question: 'True or False: Automation testing eliminates manual testing?', type: 'truefalse' },
          { question: 'Choose the tool used for automation:', type: 'multiple', options: ['Selenium', 'Jest', 'JUnit', 'Maven'] },
          { question: 'True or False: Automation testing requires coding skills?', type: 'truefalse' },
          { question: 'Write a brief about automation test frameworks.', type: 'text' },
          { question: 'What is the purpose of test automation?', type: 'text' },
          { question: 'True or False: Automation testing reduces testing time.', type: 'truefalse' },
          { question: 'Which of these is NOT a test automation tool?', type: 'multiple', options: ['Cucumber', 'Cypress', 'React', 'Postman'] },
          { question: 'Explain the importance of regression testing in automation.', type: 'text' },
          { question: 'Describe the role of Selenium WebDriver.', type: 'text' },
        ],
      },
      {
        title: 'Quiz 3',
        dueDate: '10/15/24',
        submitted: '10/16/24',
        questions: [
          { question: 'What is Automation Testing?', type: 'text' },
          { question: 'True or False: Automation testing eliminates manual testing?', type: 'truefalse' },
          { question: 'Choose the tool used for automation:', type: 'multiple', options: ['Selenium', 'Jest', 'JUnit', 'Maven'] },
          { question: 'What is test data in automation?', type: 'text' },
          { question: 'True or False: Automation tests are only for developers.', type: 'truefalse' },
          { question: 'Explain the role of an automation framework.', type: 'text' },
          { question: 'What is continuous testing?', type: 'text' },
          { question: 'Choose an integration testing tool:', type: 'multiple', options: ['JUnit', 'Cucumber', 'Mocha', 'None'] },
          { question: 'Define load testing and its importance.', type: 'text' },
          { question: 'What does TDD stand for?', type: 'text' },
        ],
        studentAnswers: {
          q1: 'Testing using tools to automate test cases.',
          q2: 'False',
          q3: 'Selenium',
          q4: 'Data used to execute tests.',
          q5: 'False',
          q6: 'Helps organize and execute tests systematically.',
          q7: 'Continuous testing integrates with CI/CD.',
          q8: 'JUnit',
          q9: 'Ensures performance under load.',
          q10: 'Test-Driven Development',
        },
        correctAnswers: {
          q1: 'Testing using tools to automate test cases.',
          q2: 'True',
          q3: 'Selenium',
          q4: 'Data used to execute tests.',
          q5: 'False',
          q6: 'Helps organize and execute tests systematically.',
          q7: 'Continuous testing integrates with CI/CD.',
          q8: 'JUnit',
          q9: 'Ensures performance under load.',
          q10: 'Test-Driven Development',
        },
      },
    ],
    'SOSAD TALAGA': [
      {
        title: 'Quiz 4',
        dueDate: '12/9/24',
        questions: [
          { question: 'Explain the phrase "SOSAD TALAGA".', type: 'text' },
          { question: 'True or False: This is a motivational phrase.', type: 'truefalse' },
          { question: 'What could be the meaning of "SOSAD"?', type: 'multiple', options: ['So Sad', 'So Glad', 'So Bad', 'None'] },
          // Add 7 more questions
        ],
      },
      {
        title: 'Quiz 5',
        dueDate: '11/10/24',
        submitted: '11/12/24',
        points: '95/100',
        questions: [
          // At least 10 questions
        ],
      },
    ],
    'Try trylang': [
      {
        title: 'Quiz 6',
        dueDate: '10/01/24',
        submitted: '10/02/24',
        points: '90/100',
        questions: [
          // At least 10 questions
        ],
      },
    ],
  };

  export default quizzesData;
