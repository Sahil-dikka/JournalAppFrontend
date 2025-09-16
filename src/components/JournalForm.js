import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import usePost from "../Hooks/PostDetails";
import ApiRoutes from "../ApiRoutes/ApiRoutes";
import useGet from "../Hooks/GetDetails";
import { useEffect } from "react";
import usePut from "../Hooks/PutDetails";
import Loader from "./common/Loader";

export default function JournalForm() {

  const navigate = useNavigate();
  
  const {id} = useParams();
  const {handleSubmit,register,reset,setValue} = useForm();

  const {isLoading: createJournalLoading, mutate: createJournal} = usePost();
  const {isLoading: updateJournalLoading, mutate: updateJournal} = usePut();

  const journalEndpoint = ApiRoutes.GET.GET_JOURNAL_BY_ID.replace("id", `id/${id}`);
  const {isLoading: journalIdLoading,data:journalViewData , refetch: getJournalById} = useGet(journalEndpoint,{enabled: false});

  console.log("jjjjjjjjjjj",id,journalViewData);
  
  const JournalFormSubmit = (data) => {
    console.log("DDDDDD",data)
    let createJournalRequestBody = {
      title: data?.title,
      content: data?.content
  }

  if(id === "new"){
    
    createJournal(
      {
        endpoint: ApiRoutes.POST.CREATE_NEW_JOURNAL ,
        formData: createJournalRequestBody
      },
      {
        onSuccess: (data) => {
          console.log("Journal created successfully:", data);
          reset();
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error("Error creating journal:", error);
        }
      }
    );
  } else{
    updateJournal(
      {
        endpoint: ApiRoutes.PUT.UPDATE_JOURNAL.replace("id", `id/${id}`),
        formData: createJournalRequestBody
      },
      {
        onSuccess: (data) => {
          console.log("Journal updated successfully:", data);
          reset();
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error("Error updating journal:", error);
        }
      }
    )
  }

  }

  useEffect(() => {
  if (id !== "new") {
    getJournalById();
  }
}, [id, getJournalById]);

useEffect(() => {
  if (journalViewData) {
    setValue("title", journalViewData.title);
    setValue("content", journalViewData.content);
  }
}, [journalViewData, setValue]);

  return (
    <div className="card shadow mx-auto mt-5" style={{ maxWidth: "500px", borderRadius: "18px" }}>
      <div className="card-body p-4">
        <h2 className="fw-bold text-primary mb-4 text-center">Journal Entry</h2>
        <form onSubmit={handleSubmit(JournalFormSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="journal-title"> Journal Title</label>
            <input
              type="text"
              className="form-control"
              id="journal-title"
              placeholder="Enter journal title"
              style={{ borderRadius: "10px" }}
              {...register("title")}
              
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="journal-content">Journal Content</label>
            <textarea
              className="form-control"
              id="journal-content"
              rows={6}
              placeholder="Write your journal content here"
              style={{ borderRadius: "10px", resize: "vertical" }}
              {...register("content")}
              
            />
          </div>

          <div className="d-flex justify-content-between gap-3">
            <button type="submit" className="btn btn-primary w-90 fw-bold" style={{ borderRadius: "10px" }}>
              Save Journal
            </button>
            <button type="button" className="btn btn-secondary w-90 fw-bold" style={{ borderRadius: "10px" }}
            onClick={()=>navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      {(createJournalLoading || updateJournalLoading || journalIdLoading) && (<Loader text={"Loading..."}/>)}
    </div>
  );
}