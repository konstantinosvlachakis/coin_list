# Coin List Frontend

A React-based frontend application for displaying and managing a list of cryptocurrencies.

## Features

- View a list of cryptocurrencies with details
- Search and filter coins
- Responsive and user-friendly interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

#### Clone the Repository

```bash
git clone https://github.com/konstantinosvlachakis/coin_list.git
```

#### Install Frontend Dependencies

```bash
cd coin_list/frontend
npm install
```

#### Install Backend Dependencies

Create a virtual environment in a folder by opening a terminal and navigating into a folder and then

```bash
python -m venv name_of_venv 
cd name_of_venv\Scripts
./Activate
```

Then you go back to the backend folder from the same terminal and hit pip install -r requirements.txt

### Running the App

#### Start the Backend

```bash
python manage.py runserver
```

#### Start the Frontend

Open a new terminal and run:

```bash
cd ../frontend
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

## Project Structure

```bash
coin_list/
├── backend/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── README.md
```

## License

[MIT](../LICENSE)
