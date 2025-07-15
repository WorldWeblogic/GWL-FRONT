const MonthEndUnavailable = () => {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const unlockDate = lastDay.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="flex items-center justify-center min-h-[70vh] px-4">
            <div className="w-full max-w-lg rounded-2xl border border-yellow-300 bg-yellow-50 p-8 shadow-lg">
                <h2 className="text-center text-2xl font-semibold text-yellow-800 mb-4">
                    Form locked until the last day.
                </h2>

                <p className="text-center text-sm leading-relaxed text-yellow-900">
                    The <span className="font-medium">Monthly&nbsp;Sales&nbsp;Form</span> is
                    available <em>only on the last&nbsp;day&nbsp;of&nbsp;the&nbsp;month</em>.
                    <br />
                    Today is <strong>{today.toLocaleDateString("en-IN")}</strong>, so the form
                    is currently disabled.
                    <br />
                    Please come back on <strong>{unlockDate}</strong> to submit your sales.
                </p>
            </div>
        </div>
    );
};

export default MonthEndUnavailable;
