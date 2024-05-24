import { TRENDING } from "../../../../utils/movie_urls";
import PreFetchMovieInfo from "./cacher";
import styles from "../styles/pop_trend.module.css";
import Link from "next/link";
import Image from "next/image";

export default async function TREDNING_MOVIES() {
	const data = await get_popular();
	PreFetchMovieInfo(data);

	return (
		<main className={styles.Main}>
			<h2>Trending Movies</h2>
			<section className={styles.MovieContainer}>
				{data &&
					data.results &&
					data.results.slice(0, 16).map((item, index) => (
						<Link
							href={`/movies/${item.id}`}
							style={{
								textDecoration: "none",
								color: "white",
							}}
							key={index}
						>
							<div className={styles.MovieEntryPrev}>
								<div className={styles.MovieEntry}>
									<Image
										src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${item.poster_path}`}
										width={180}
										height={300}
										alt="Movie Poster"
									></Image>
									<p>{item.title}</p>
								</div>
							</div>
						</Link>
					))}
			</section>
		</main>
	);
}

const get_popular = async () => {
	const res = await fetch(TRENDING, { next: { revalidate: 21620 } });
	const data = await res.json();
	return data;
};
