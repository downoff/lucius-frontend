// ... inside the return statement ...
<div className="mt-8 flex-grow overflow-y-auto">
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">History</p>
    {isLoadingHistory ? (
        <p className="text-slate-400 text-sm">Loading...</p>
    ) : (
        <nav className="flex flex-col gap-2">
            {history.length > 0 ? history.map(conv => (
                // UPDATE THIS LINK
                <Link key={conv._id} to={`/app/c/${conv._id}`} className="text-sm text-slate-400 truncate hover:text-white">
                    {conv.title}
                </Link>
            )) : (
                <p className="text-slate-400 text-sm">No conversations yet.</p>
            )}
        </nav>
    )}
</div>
// ...