export default function AdminEditGameForm({userInfo}) {
  const [user, setUser] = useState(userInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    // Submit your form logic here
  };

  return (
    <form onSubmit={handleSubmitEdit} className="bg-white p-5 rounded-lg shadow">
      <div className="flex flex-col gap-4">
        <label className="flex justify-between items-center">
          Họ và tên
          <input type="text" name="fullName" value={user.fullName} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="flex justify-between items-center">
          Email
          <input type="email" name="email" value={user.email} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
        </label>
        {/* Add more fields as necessary */}
      </div>
      <button type="submit" className="btn mt-4">Lưu thay đổi</button>
    </form>
  );
}