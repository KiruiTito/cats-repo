const catFactsContainer = document.querySelector('.cat-facts');
const form = document.querySelector('.form');

// Function to fetch cat facts from the API
async function fetchCatFacts() {
  try {
    const response = await fetch('https://cat-fact.herokuapp.com/facts');
    if (!response.ok) {
      throw new Error('Failed to fetch cat facts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Function to display cat facts in the container
function displayCatFacts(catFacts) {
  catFactsContainer.innerHTML = '';

  catFacts.forEach((catFact) => {
    const card = document.createElement('div');
    card.classList.add('cat-fact-card');

    const text = document.createElement('p');
    text.textContent = `Fact: ${catFact.text}`;

    const type = document.createElement('p');
    type.textContent = `Type: ${catFact.type}`;

    const updatedAt = document.createElement('p');
    updatedAt.textContent = `Updated At: ${catFact.updatedAt}`;

    card.appendChild(text);
    card.appendChild(type);
    card.appendChild(updatedAt);

    catFactsContainer.appendChild(card);
  });
}

// Event listener to refresh the cat facts
document.addEventListener('DOMContentLoaded', async () => {
  const catFacts = await fetchCatFacts();
  displayCatFacts(catFacts);

  const refreshButton = document.querySelector('#refresh-button');
  refreshButton.addEventListener('click', async () => {
    const catFacts = await fetchCatFacts();
    displayCatFacts(catFacts);
  });
});

// Event listener to handle the form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const factText = document.querySelector('#fact-text').value;
  const factType = document.querySelector('#fact-type').value;

  // Send a POST request to the API to add the new cat fact
  try {
    const response = await fetch('https://cat-fact.herokuapp.com/facts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: factText, type: factType }),
    });

    if (!response.ok) {
      throw new Error('Failed to add cat fact');
    }

    const newFact = await response.json();

    // Fetch the updated cat facts and display them
    const catFacts = await fetchCatFacts();
    displayCatFacts(catFacts);

    // Reset the form fields
    document.querySelector('#fact-text').value = '';
    document.querySelector('#fact-type').value = '';

    console.log('New cat fact added:', newFact);
  } catch (error) {
    console.error(error);
  }
});

// Additional event listeners can be added as per your requirements
