import { useQuery } from "react-query";

const TrendigPage = () =>{
    const { data, error, isLoading, isError } = useQuery('trending', "day", getUpcomingMovies)

}