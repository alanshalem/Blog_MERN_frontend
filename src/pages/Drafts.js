import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminRow from "../components/AdminRow";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { useGlobalContext } from "../context";
import Pagination from "../components/Pagination";
import { useLocation, useHistory } from "react-router";
import { getParamValue } from "../utils/handleParams";

export default function Drafts() {
  const [drafts, setDrafts] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const {
    userInfo,
    showAlert,
    isAlertShowing,
    isConfirmDelete,
    setIsConfirmDelete,
    loading,
    setLoading,
  } = useGlobalContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(
    location.search ? location.search.split("=")[1] : 1
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (location.search.includes("page")) {
      let currentPage = getParamValue(location, "page");
      setPageNumber(currentPage ? currentPage : 1);
    }
    if (location.search.includes("filter")) {
      let currentFilter = getParamValue(location, "filter");
      setFilter(currentFilter);
    }
  }, [location]);

  //Load drafts
  useEffect(() => {
    const fetchDrafts = async () => {
      setLoading(true);
      try {
        let config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

        const { data } = await axios.get(
          `/api/drafts?pageNumber=${pageNumber}&filter=${filter}`,
          config
        );

        setPages(data.pages);
        setDrafts(data.drafts);
        setPage(data.page);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching drafts.");
        console.error(error);
        setLoading(false);
      }
    };
    fetchDrafts();
  }, [pageNumber, filter, deleteSuccess, setLoading, userInfo.token]);
  const deleteDraft = useCallback(async () => {
    setLoading(true);
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`/api/drafts/${draftToDelete._id}`, config);

      setDeleteSuccess(true);
      setIsDeleting(false);
      setIsConfirmDelete(false);
      setDraftToDelete(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [draftToDelete, userInfo.token, setIsConfirmDelete, setLoading]);

  useEffect(() => {
    if (!isAlertShowing && isConfirmDelete && isDeleting) {
      deleteDraft();
    }
  }, [isAlertShowing, isConfirmDelete, isDeleting, deleteDraft]);

  const handleDeleteDraft = (draft) => {
    showAlert();
    setIsDeleting(true);
    setDraftToDelete(draft);
  };

  const handleFilterSelect = (category) => {
    // Sort drafts
    history.push(`/admin/drafts/?page=1&filter=${category}`);
  };

  return (
    <div className="grid place-items-center w-full dark:bg-gray-600 py-10 rounded-md">
      <h1 className="mb-5">Admin Dashboard</h1>
      <p>Manage all current drafts.</p>

      {/* All Drafts Container */}
      <div className="p-10 w-full max-w-5xl">
        <h2 className="border-b-2 pb-2 m-2">Drafts</h2>

        {loading ? (
          <Loader />
        ) : drafts.length === 0 ? (
          <p className="m-2">No Drafts Found</p>
        ) : (
          <>
            <div className="sm:hidden flex gap-5 px-2 py-5 justify-end">
              <p>Filter by: </p>
              <select
                className="rounded"
                name="post-filter"
                id="post-filter"
                onChange={(e) => handleFilterSelect(e.target.value)}
                value={filter}
              >
                <option value="" hidden>
                  category
                </option>
                <option value="title">title</option>
                <option value="tags">tags</option>
                <option value="date">date</option>
              </select>
            </div>
            <div className="hidden sm:grid grid-cols-admin-table  sm:mb-1 rounded-md dark:text-gray-100 text-center">
              <div
                className="lg:w-4/5 p-2 font-semibold cursor-pointer"
                onClick={() => handleFilterSelect("title")}
              >
                Title
              </div>
              <div
                className="lg:w-4/5 p-2 font-semibold cursor-pointer"
                onClick={() => handleFilterSelect("tags")}
              >
                Tags
              </div>
              <div
                className="lg:w-4/5 p-2 font-semibold cursor-pointer"
                onClick={() => handleFilterSelect("date")}
              >
                Date
              </div>
              <div className="lg:w-4/5 p-2 font-semibold">
                Edit/Remove Draft
              </div>
            </div>

            <div className="grid grid-flow-row">
              {drafts.map((draft) => {
                return (
                  <AdminRow
                    key={draft._id}
                    document={draft}
                    handleEditDocument={() =>
                      history.push(`/admin/edit-draft/${draft._id}`)
                    }
                    handleDeleteDocument={handleDeleteDraft}
                    documentPath="/admin/drafts"
                  />
                );
              })}

              <div className="grid place-items-center">
                <Pagination pages={pages} page={page} location={location} />
              </div>
            </div>
          </>
        )}
      </div>
      <button
        className="btn-primary px-4 mt-4"
        onClick={() => {
          history.push("/admin");
        }}
      >
        Back to Menu
      </button>

      {/* Alert used to confirm deleting a draft */}
      {isAlertShowing && <Alert postName={draftToDelete.title} />}
    </div>
  );
}
