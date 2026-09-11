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
