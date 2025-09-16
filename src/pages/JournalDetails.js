import JournalForm from "../components/JournalForm";
import Navbar from "../components/Navbar";

export default function JournalDetails() {
  return (
    <div>

        <div>
            <Navbar/>

        </div>
      <h1>Journal Details</h1>

      <JournalForm/>
      {/* Display journal details here */}

    </div>
  );
}
