# Evenzaa

## Deployed App
[Evenzaa](https://evenzaa.netlify.app/)

---

## Features in Detail

### **Calendar View**
- Displays the current month by default.
- Navigation buttons allow switching between months.
- Dates are clickable to open the Event Modal for adding events.

### **Event Management**
- Clicking on a date opens a modal where users can add event details.
- Each event requires a name and start/end time; a description is optional.
- Users can edit or delete events for any selected date.

### **Event List**
- A detailed list of events for the selected day is shown in a modal, making it easy to manage and review events.

### **Data Persistence**
- All events are saved in the browser's `localStorage` to ensure they persist across page reloads.

### **Bonus Features**
1. **Drag-and-Drop**: Users can reschedule events by dragging them between days.
2. **Color Coding**: Events are categorized (work, personal, others) and color-coded for better visualization.
3. **Export Events**:
   - JSON: Exports all events for the current month as a `.json` file.
   - CSV: Exports all events for the current month as a `.csv` file.
---

## Instructions to Run the App Locally

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- npm (Node Package Manager, included with Node.js)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Vipul-Mhatre/Evenzaa.git
   cd Evenzaa
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000` in your browser.

4. **Optional**: To build the app for production:
   ```bash
   npm run build
   ```
   This creates a production-ready build in the `build/` directory.

---

## Contribution
Feel free to fork the repository and submit a pull request for new features, bug fixes, or enhancements!