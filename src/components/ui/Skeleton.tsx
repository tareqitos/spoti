import Skeleton, { SkeletonTheme, SkeletonThemeProps } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

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
                style={{ opacity: .4 }}
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
                style={{ opacity: .4, marginBottom: 20 }}
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