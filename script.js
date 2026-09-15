const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open');
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });
}

const caseStudyDialog = document.querySelector('#case-study-dialog');
const caseStudyOpen = document.querySelector('[data-case-study-open]');
const caseStudyClose = document.querySelector('[data-case-study-close]');

if (caseStudyDialog && caseStudyOpen && caseStudyClose) {
  const closeCaseStudy = () => {
    caseStudyDialog.close();
    document.body.classList.remove('case-study-open');
    caseStudyOpen.focus();
  };

  caseStudyOpen.addEventListener('click', () => {
    caseStudyDialog.showModal();
    document.body.classList.add('case-study-open');
  });

  caseStudyClose.addEventListener('click', closeCaseStudy);

  caseStudyDialog.addEventListener('click', (event) => {
    if (event.target === caseStudyDialog) closeCaseStudy();
  });

  caseStudyDialog.addEventListener('close', () => {
    document.body.classList.remove('case-study-open');
  });
}

const problemStoryTabs = Array.from(document.querySelectorAll('[data-problem-tab]'));
const problemStoryPanels = Array.from(document.querySelectorAll('[data-problem-panel]'));

if (problemStoryTabs.length && problemStoryPanels.length) {
  const showProblemStory = (storyName, moveFocus = false) => {
    problemStoryTabs.forEach((tab) => {
      const isSelected = tab.dataset.problemTab === storyName;
      tab.classList.toggle('is-active', isSelected);
      tab.setAttribute('aria-selected', String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      if (isSelected && moveFocus) tab.focus();
    });

    problemStoryPanels.forEach((panel) => {
      const isSelected = panel.dataset.problemPanel === storyName;
      panel.classList.toggle('is-active', isSelected);
      panel.hidden = !isSelected;
    });
  };

  problemStoryTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showProblemStory(tab.dataset.problemTab));

    tab.addEventListener('keydown', (event) => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowDown') nextIndex = (index + 1) % problemStoryTabs.length;
      if (event.key === 'ArrowUp') nextIndex = (index - 1 + problemStoryTabs.length) % problemStoryTabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = problemStoryTabs.length - 1;
      showProblemStory(problemStoryTabs[nextIndex].dataset.problemTab, true);
    });
  });
}
