import Skeleton, { SkeletonTheme, SkeletonThemeProps } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const opacity = .5

const Wrapper = ({ children, width, height }: SkeletonThemeProps) => {
    return (
        <SkeletonTheme
            baseColor="#444"
            highlightColor="#777"
            width={width}
            height={height}
        >
            {children}
        </SkeletonTheme>
    )
}

export const PlaylistSkeleton = () => {
    return (
        <Wrapper
            height={80}
        >
            <Skeleton
                className="tracks-container"
                count={15}
                style={{ opacity: opacity }}
            />
        </Wrapper>
    )
}

export const ListSkeleton = () => {
    return (
        <Wrapper
            width={"20vw"}
            height={20}
        >
            <Skeleton
                count={40}
                style={{ opacity: opacity, marginBottom: 20 }}
            />
        </Wrapper>
    )
}

const TrackImageSeleton = () => {
    return (
        <Wrapper
            width={"100%"}
            height={320}
        >
            <Skeleton
                style={{ opacity: opacity, marginTop: 20, borderRadius: 20 }}
            />
        </Wrapper>
    )
}

export const HomePageSkeleton = () => {
    return (
        <div className="homepage">
            <section className="sidebar">
                <ListSkeleton />
            </section>
            <section className="main">
                <PlaylistSkeleton />
            </section>
        </div>
    )
}

export const TrackBarSkeleton = () => {
    return (
        <>
            <div className="track image">
                <TrackImageSeleton />
            </div>
            <div className="track infos">
                <h2>
                    <Wrapper >
                        <Skeleton className="name" style={{ opacity: opacity }} />
                    </Wrapper>
                </h2>

                <Wrapper height={20}>
                    <Skeleton className="artist" style={{ opacity: opacity }} />
                </Wrapper>

                <Wrapper baseColor="#444" >
                    <Skeleton className="card-container first" style={{ opacity: opacity, backgroundColor: "#444" }} />
                </Wrapper>
                <Wrapper >
                    <Skeleton className="card-container" style={{ opacity: opacity, backgroundColor: "#444" }} />
                </Wrapper>
            </div>

        </>
    )
}