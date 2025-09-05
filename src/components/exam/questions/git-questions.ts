// Git Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// BEGINNER QUESTIONS
export const gitBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('git-fundamentals', 1),
    'What is Git?',
    ['A version control system', 'A programming language', 'A database', 'A web framework'],
    'A version control system',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-fundamentals', 2),
    'Git is a distributed version control system',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-fundamentals', 3),
    'Which command is used to initialize a new Git repository?',
    ['git start', 'git init', 'git create', 'git new'],
    'git init',
    3
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('git-fundamentals', 4),
    'The ___ command is used to check the status of your working directory.',
    'git status',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-fundamentals', 5),
    'Which command is used to add files to the staging area?',
    ['git add', 'git stage', 'git include', 'git put'],
    'git add',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-fundamentals', 6),
    'Git tracks changes to files over time',
    true,
    2
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-fundamentals', 7),
    'Which command is used to commit changes?',
    ['git save', 'git commit', 'git store', 'git record'],
    'git commit',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-fundamentals', 8),
    'What is the purpose of the .gitignore file?',
    ['To track files', 'To specify which files Git should ignore', 'To store commit messages', 'To configure Git settings'],
    'To specify which files Git should ignore',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-fundamentals', 9),
    'Git allows multiple developers to work on the same project simultaneously',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-fundamentals', 10),
    'Which command is used to view the commit history?',
    ['git history', 'git log', 'git show', 'git list'],
    'git log',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-fundamentals', 11),
    'What is a repository in Git?',
    ['A file', 'A folder that contains your project and its version history', 'A command', 'A setting'],
    'A folder that contains your project and its version history',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-fundamentals', 12),
    'Git stores the complete history of changes locally',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-fundamentals', 13),
    'Which command is used to clone a repository?',
    ['git copy', 'git clone', 'git download', 'git get'],
    'git clone',
    3
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('git-fundamentals', 14),
    'The ___ command is used to see the differences between files.',
    'git diff',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-fundamentals', 15),
    'What is the purpose of the staging area in Git?',
    ['To store files permanently', 'To prepare changes for commit', 'To backup files', 'To share files'],
    'To prepare changes for commit',
    3
  )
];

// INTERMEDIATE QUESTIONS
export const gitIntermediateQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('git-branching', 1),
    'Which command is used to create a new branch?',
    ['git new branch', 'git branch', 'git create branch', 'git make branch'],
    'git branch',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-branching', 2),
    'Which command is used to switch to a different branch?',
    ['git switch', 'git checkout', 'Both A and B', 'git change'],
    'Both A and B',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-branching', 3),
    'Branches in Git allow you to work on different features independently',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-branching', 4),
    'Which command is used to merge branches?',
    ['git combine', 'git merge', 'git join', 'git unite'],
    'git merge',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('git-branching', 5),
    'The ___ command is used to push changes to a remote repository.',
    'git push',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-branching', 6),
    'Which command is used to pull changes from a remote repository?',
    ['git pull', 'git fetch', 'git get', 'git download'],
    'git pull',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-branching', 7),
    'What is the difference between git pull and git fetch?',
    ['No difference', 'git pull fetches and merges, git fetch only downloads', 'git fetch is faster', 'git pull is older'],
    'git pull fetches and merges, git fetch only downloads',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-branching', 8),
    'Git allows you to work offline and sync changes later',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-branching', 9),
    'Which command is used to see all branches?',
    ['git list branches', 'git branch -a', 'git show branches', 'git all branches'],
    'git branch -a',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-branching', 10),
    'What is a remote repository?',
    ['A local copy', 'A repository hosted on a server', 'A backup', 'A temporary repository'],
    'A repository hosted on a server',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-branching', 11),
    'GitHub is a popular platform for hosting Git repositories',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-branching', 12),
    'Which command is used to add a remote repository?',
    ['git add remote', 'git remote add', 'git connect', 'git link'],
    'git remote add',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-branching', 13),
    'What is the purpose of git stash?',
    ['To delete files', 'To temporarily save changes without committing', 'To create branches', 'To merge branches'],
    'To temporarily save changes without committing',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('git-branching', 14),
    'The ___ command is used to apply stashed changes.',
    'git stash pop',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-branching', 15),
    'Which command is used to see the remote repositories?',
    ['git remote -v', 'git list remotes', 'git show remotes', 'git remotes'],
    'git remote -v',
    4
  )
];

// ADVANCED QUESTIONS
export const gitAdvancedQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('git-advanced', 1),
    'What is a rebase in Git?',
    ['A type of branch', 'A way to move or combine commits', 'A remote repository', 'A configuration file'],
    'A way to move or combine commits',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-advanced', 2),
    'Which command is used to perform an interactive rebase?',
    ['git rebase -i', 'git interactive rebase', 'git rebase --interactive', 'git rebase -interactive'],
    'git rebase -i',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-advanced', 3),
    'Rebasing rewrites commit history',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-advanced', 4),
    'What is the purpose of git cherry-pick?',
    ['To delete commits', 'To apply specific commits from one branch to another', 'To create branches', 'To merge branches'],
    'To apply specific commits from one branch to another',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('git-advanced', 5),
    'The ___ command is used to reset the current branch to a previous commit.',
    'git reset',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-advanced', 6),
    'What is the difference between git reset --soft and git reset --hard?',
    ['No difference', '--soft keeps changes staged, --hard discards all changes', '--hard is faster', '--soft is newer'],
    '--soft keeps changes staged, --hard discards all changes',
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-advanced', 7),
    'Which command is used to create a tag?',
    ['git tag', 'git create tag', 'git new tag', 'git make tag'],
    'git tag',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-advanced', 8),
    'Git tags are used to mark specific points in history',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-advanced', 9),
    'What is the purpose of git bisect?',
    ['To merge branches', 'To find the commit that introduced a bug', 'To create tags', 'To delete branches'],
    'To find the commit that introduced a bug',
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-advanced', 10),
    'Which command is used to see the differences between two commits?',
    ['git diff commit1 commit2', 'git compare', 'git show diff', 'git differences'],
    'git diff commit1 commit2',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-advanced', 11),
    'Git hooks are scripts that run automatically at certain points in the Git workflow',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-advanced', 12),
    'What is the purpose of git reflog?',
    ['To show remote repositories', 'To show a log of where HEAD has been', 'To create branches', 'To merge branches'],
    'To show a log of where HEAD has been',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-advanced', 13),
    'Which command is used to create a patch file?',
    ['git patch', 'git format-patch', 'git create patch', 'git make patch'],
    'git format-patch',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('git-advanced', 14),
    'The ___ command is used to apply a patch file.',
    'git apply',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-advanced', 15),
    'What is the purpose of git submodules?',
    ['To create branches', 'To include one Git repository inside another', 'To merge branches', 'To delete files'],
    'To include one Git repository inside another',
    6
  )
];

// COLLABORATION QUESTIONS
export const gitCollaborationQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('git-collaboration', 1),
    'What is a pull request?',
    ['A Git command', 'A request to merge changes from one branch to another', 'A type of branch', 'A configuration file'],
    'A request to merge changes from one branch to another',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-collaboration', 2),
    'What is the purpose of forking a repository?',
    ['To delete it', 'To create a personal copy of someone else\'s project', 'To merge it', 'To clone it locally'],
    'To create a personal copy of someone else\'s project',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-collaboration', 3),
    'Pull requests allow for code review before merging changes',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-collaboration', 4),
    'What is the purpose of git blame?',
    ['To show who last modified each line of a file', 'To delete files', 'To create branches', 'To merge branches'],
    'To show who last modified each line of a file',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('git-collaboration', 5),
    'The ___ workflow involves creating feature branches for each new feature.',
    'Git Flow',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-collaboration', 6),
    'What is the purpose of a merge conflict?',
    ['To delete files', 'A situation where Git cannot automatically merge changes', 'To create branches', 'To show differences'],
    'A situation where Git cannot automatically merge changes',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-collaboration', 7),
    'Which command is used to resolve merge conflicts?',
    ['git resolve', 'git fix', 'Edit the conflicted files manually', 'git conflict'],
    'Edit the conflicted files manually',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('git-collaboration', 8),
    'Git allows multiple people to work on the same file simultaneously',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-collaboration', 9),
    'What is the purpose of git log --oneline?',
    ['To show detailed commit information', 'To show a condensed view of commit history', 'To create commits', 'To delete commits'],
    'To show a condensed view of commit history',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('git-collaboration', 10),
    'Which command is used to see the changes in a specific commit?',
    ['git show', 'git view', 'git display', 'git see'],
    'git show',
    4
  )
];

// COMBINED EXPORT
export const gitQuestions: Question[] = [
  ...gitBeginnerQuestions,
  ...gitIntermediateQuestions,
  ...gitAdvancedQuestions,
  ...gitCollaborationQuestions
];
