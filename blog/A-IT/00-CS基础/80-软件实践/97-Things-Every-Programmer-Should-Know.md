
[【github】 97-things-every-programmer-should-know: Pearls of wisdom for programmers collected from leading practitioners.](https://github.com/97-things/97-things-every-programmer-should-know)
[【gitbook】 97 Things Every Programmer Should Know](https://97-things-every-x-should-know.gitbook.io/97-things-every-programmer-should-know/en)




## Act with Prudence
Pay off technical debt as soon as possible. It would be imprudent to do otherwise.

Technical debt is like a loan: You benefit from it in the short-term, but you have to pay interest on it until it is fully paid off.
Shortcuts in the code make it harder to add features or refactor your code.
In fact, it is often only when things have got so bad that you must fix it, that you actually do go back to fix it. And by then it is often so hard to fix that you really can't afford the time or the risk.
If technical debt is incurred，you must **track** technical debt and pay it back quickly or things go rapidly downhill. As soon as you make the decision to compromise, write a task card or log it in your issue tracking system to ensure that it does not get forgotten.


## Apply Functional Programming Principles
A leading cause of defects in imperative code is attributable to mutable variables. Everyone reading this will have investigated why some value is not as expected in a particular situation.


## Ask "What Would the User Do?" (You Are not the User)
We all tend to assume that other people think like us. But they don't. Psychologists call this the false consensus bias. When people think or act differently to us, we're quite likely to label them (subconsciously) as defective in some way.

The best way to find out how users think is to watch one. Ask a user to complete a task using a similar piece of software to what you're developing.
Spending an hour watching users is more informative than spending a day guessing what they want.

## Automate Your Coding Standard
There exists a wealth of tools that can be used to produce code quality reports and to document and maintain the coding standard, but that isn't the whole solution. It should be automated and enforced where possible. Here are a few examples:
- Make sure code formatting is part of the build process, so that everybody runs it automatically every time they compile the code.
- Use static code analysis tools to scan the code for unwanted anti-patterns. If any are found, break the build.
- Learn to configure those tools so that you can scan for your own, project-specific anti-patterns.
- Do not only measure test coverage, but automatically check the results too. Again, break the build if test coverage is too low.

## Beauty Is in Simplicity
> _Beauty of style and harmony and grace and good rhythm depends on simplicity._ — Plato

There are a number of things we strive for in our code:
- Readability
- Maintainability
- Speed of development
- The elusive quality of beauty

Each individual part is kept simple with simple responsibilities and simple relationships with the other parts of the system. This is the way we can keep our systems maintainable over time, with clean, simple, testable code, keeping the speed of development high throughout the lifetime of the system.

## Before You Refactor
- The best approach for restructuring starts by taking stock of the existing codebase and the tests written against that code.
- Avoid the temptation to rewrite everything. It is best to reuse as much code as possible. No matter how ugly the code is, it has already been tested, reviewed, etc.
- Many incremental changes are better than one massive change. Incremental changes allows you to gauge the impact on the system more easily through feedback, such as from tests.
- After each iteration, it is important to ensure that the existing tests pass
- Personal preferences and ego shouldn't get in the way. If something isn't broken, why fix it? That the style or the structure of the code does not meet your personal preference is not a valid reason for restructuring. Thinking you could do a better job than the previous programmer is not a valid reason either.
- New technology is insufficient reason to refactor. Unless a cost–benefit analysis shows that a new language or framework will result in significant improvements in functionality, maintainability, or productivity, it is best to leave it as it is.
- Remember that humans make mistakes. Restructuring will not always guarantee that the new code will be better — or even as good as — the previous attempt. 


## Beware the Share
When coming into an existing code base with no knowledge of the context where the various parts will be used, I'm much more careful these days about what is shared.



## The Boy Scout Rule

## Check Your Code First before Looking to Blame Others

## Choose Your Tools with Care

## Code in the Language of the Domain

## Code Is Design

## Code Layout Matters

## Code Reviews

## Coding with Reason

## A Comment on Comments

## Comment Only What the Code Cannot Say

## Continuous Learning

## Convenience Is not an -ility

## Deploy Early and Often

## Distinguish Business Exceptions from Technical

## Do Lots of Deliberate Practice

## Domain-Specific Languages

## Don't Be Afraid to Break Things

## Don't Be Cute with Your Test Data

## Don't Ignore that Error!

## Don't Just Learn the Language, Understand its Culture

## Don't Nail Your Program into the Upright Position

## Don't Rely on "Magic Happens Here"

## Don't Repeat Yourself

## Don't Touch that Code!

## Encapsulate Behavior, not Just State

## Floating-point Numbers Aren't Real

## Fulfill Your Ambitions with Open Source

## The Golden Rule of API Design

## The Guru Myth

## Hard Work Does not Pay Off

## How to Use a Bug Tracker

## Improve Code by Removing It

## Install Me

## Inter-Process Communication Affects Application Response Time

## Keep the Build Clean

## Know How to Use Command-line Tools

## Know Well More than Two Programming Languages

## Know Your IDE

## Know Your Limits

## Know Your Next Commit

## Large Interconnected Data Belongs to a Database

## Learn Foreign Languages

## Learn to Estimate

## Learn to Say "Hello, World"

## Let Your Project Speak for Itself

## The Linker Is not a Magical Program

## The Longevity of Interim Solutions

## Make Interfaces Easy to Use Correctly and Hard to Use Incorrectly

## Make the Invisible More Visible

## Message Passing Leads to Better Scalability in Parallel Systems

## A Message to the Future

## Missing Opportunities for Polymorphism

## News of the Weird: Testers Are Your Friends

## One Binary

## Only the Code Tells the Truth

## Own (and Refactor) the Build

## Pair Program and Feel the Flow

## Prefer Domain-Specific Types to Primitive Types

## Prevent Errors

## The Professional Programmer

## Put Everything Under Version Control

## Put the Mouse Down and Step Away from the Keyboard

## Read Code

## Read the Humanities

## Reinvent the Wheel Often

## Resist the Temptation of the Singleton Pattern

## The Road to Performance Is Littered with Dirty Code Bombs

## Simplicity Comes from Reduction

## The Single Responsibility Principle

## Start from Yes

## Step Back and Automate, Automate, Automate

## Take Advantage of Code Analysis Tools

## Test for Required Behavior, not Incidental Behavior

## Test Precisely and Concretely

## Test While You Sleep (and over Weekends)

## Testing Is the Engineering Rigor of Software Development

## Thinking in States

## Two Heads Are Often Better than One

## Two Wrongs Can Make a Right (and Are Difficult to Fix)

## Ubuntu Coding for Your Friends

## The Unix Tools Are Your Friends

## Use the Right Algorithm and Data Structure

## Verbose Logging Will Disturb Your Sleep

## WET Dilutes Performance Bottlenecks

## When Programmers and Testers Collaborate

## Write Code as If You Had to Support It for the Rest of Your Life

## Write Small Functions Using Examples

## Write Tests for People

## You Gotta Care about the Code

## Your Customers Do not Mean What They Say