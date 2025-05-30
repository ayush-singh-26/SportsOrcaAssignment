import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await axios.get('http://localhost:8000/matches');
                setMatches(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching matches:', err);
                setError('Failed to load matches. Please try again later.');
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    if (loading) return <div>Loading matches...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Upcoming Matches</h1>
                <p className="text-gray-600 mt-2">Next fixtures in all competitions</p>
            </div>
            {matches.map((match) => {
                //I took help from internet in date
                const fixtureDate = new Date(match.fixture?.date);
                const formattedDate = fixtureDate.toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                });

                return (
                    <div key={match.fixture?.id} className="border border-gray-200 p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
                        <div className="text-sm font-medium text-gray-500 mb-2">
                            {formattedDate}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-center flex-1">
                                <img
                                    src={match.teams.home?.logo}
                                    alt={match.teams.home?.name}
                                    className="h-12 mx-auto mb-2"
                                />
                                <span className="font-medium">{match.teams.home?.name}</span>
                            </div>

                            <div className="mx-4 text-gray-400 font-bold">VS</div>

                            <div className="text-center flex-1">
                                <img
                                    src={match.teams.away?.logo}
                                    alt={match.teams.away?.name}
                                    className="h-12 mx-auto mb-2"
                                />
                                <span className="font-medium">{match.teams.away?.name}</span>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                            <div className="flex justify-between">
                                <span>Venue: {match.fixture.venue?.name}</span>
                                <span>League: {match.league?.name}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
