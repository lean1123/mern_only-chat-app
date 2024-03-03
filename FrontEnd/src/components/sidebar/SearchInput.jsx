import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");

  const { conversations } = useGetConversations();

  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchValue) return;

    if (searchValue.length < 3) {
      return toast.error("Search value have than three words");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearchValue("");
    } else {
      toast.error("Not found user");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
