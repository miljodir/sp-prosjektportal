import * as React from "react";
import Masonry from "react-masonry-component";
import {
    DocumentCard,
    DocumentCardPreview,
    DocumentCardTitle,
    DocumentCardActivity,
    DocumentCardActions,
    DocumentCardLocation,
    DocumentCardType,
    ImageFit,
    Spinner,
    SpinnerType,
    SearchBox,
} from "office-ui-fabric-react";
import Modal from "office-ui-fabric-react/lib/Modal";
import * as Util from "../../Util";
import ProjectInfo from "../ProjectInfo";
import * as Search from "./Search";
import Style from "./Style";

interface IProjectListState {
    isLoading: boolean;
    projects?: any[];
    searchTerm?: string;
    showProjectInfo?: any;
}

interface IProjectListProps {
    tileWidth?: number;
    tileImageHeight?: number;
    tileGutter?: number;
    tileClassName?: string;
    modalContainerClassName?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
}

/**
 * Project information
 */
export default class ProjectList extends React.PureComponent<IProjectListProps, IProjectListState> {
    public static defaultProps: Partial<IProjectListProps> = {
        tileWidth: 206,
        tileImageHeight: 140,
        tileGutter: 5,
        tileClassName: "pp-projectCard",
        modalContainerClassName: "pp-projectListModalContainer",
        modalHeaderClassName: "ms-font-xxl",
        projectInfoFilterField: "GtPcPortfolioPage",
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            isLoading: true,
            searchTerm: "",
        };
    }

    /**
    * Component did mount
    */
    public componentDidMount(): void {
        this.fetchData()
            .then(updatedState => this.setState({
                ...updatedState,
                isLoading: false,
            }))
            .catch(_ => this.setState({ isLoading: false }));
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const {
            isLoading,
            projects,
            searchTerm,
            showProjectInfo,
        } = this.state;

        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }

        return <div style={{ paddingRight: 40 }}>
            <SearchBox
                labelText={__("DynamicPortfolio_SearchBox_Placeholder")}
                onChanged={st => this.setState({ searchTerm: st })} />
            <Masonry
                elementType={"div"}
                options={{
                    transitionDuration: "slow",
                    gutter: this.props.tileGutter,
                }}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}>
                {projects
                    .filter(({ Title }) => Title.indexOf(searchTerm) !== -1)
                    .map(project => {
                        const [ManagerEmail = "", ManagerName = __("String_NotSet")] = project.GtProjectManagerOWSUSER.split(" | ");
                        const [OwnerEmail = "", OwnerName = __("String_NotSet")] = project.GtProjectOwnerOWSUSER.split(" | ");
                        const ManagerUserPhoto = Util.userPhoto(ManagerEmail);
                        const OwnerUserPhoto = Util.userPhoto(OwnerEmail);
                        return (
                            <DocumentCard
                                className={this.props.tileClassName}
                                type={DocumentCardType.normal}
                                onClick={e => window.setTimeout(() => !this.state.showProjectInfo && SP.Utilities.HttpUtility.navigateTo(project.Path), 250)}
                            >
                                <DocumentCardPreview previewImages={[
                                    {
                                        previewImageSrc: project.SiteLogo,
                                        imageFit: ImageFit.cover,
                                        accentColor: "#ce4b1f",
                                        width: this.props.tileWidth,
                                        height: this.props.tileImageHeight,
                                    },
                                ]} />
                                <DocumentCardTitle
                                    title={project.Title}
                                    shouldTruncate={true} />
                                <DocumentCardLocation
                                    location={project.RefinableString52 || __("String_NotSet")} />
                                <DocumentCardActivity
                                    activity={__("SiteFields_GtProjectOwner_DisplayName")}
                                    people={[
                                        {
                                            name: OwnerName,
                                            profileImageSrc: OwnerUserPhoto,
                                        },
                                    ]}
                                />
                                <DocumentCardActivity
                                    activity={__("SiteFields_GtProjectManager_DisplayName")}
                                    people={[
                                        {
                                            name: ManagerName,
                                            profileImageSrc: ManagerUserPhoto,
                                        },
                                    ]}
                                />
                                <DocumentCardLocation
                                    location="Vis prosjektinfo"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.setState({ showProjectInfo: project });
                                    }}
                                />
                            </DocumentCard>
                        );
                    })}
            </Masonry>
            {this.renderProjectInfoModal()}
            <Style props={this.props} />
        </div>;
    }

    /**
   * Renders the Project Info modal
   */
    private renderProjectInfoModal = () => {
        const { showProjectInfo } = this.state;

        const {
            modalContainerClassName,
            modalHeaderClassName,
            projectInfoFilterField,
        } = this.props;

        console.log(showProjectInfo);

        if (showProjectInfo) {
            return (
                <Modal
                    isOpen={showProjectInfo}
                    isDarkOverlay={true}
                    onDismiss={e => this.setState({ showProjectInfo: null })}
                    containerClassName={modalContainerClassName}
                    isBlocking={false}
                >
                    <div style={{ padding: 50 }}>
                        <div className={modalHeaderClassName} style={{ marginBottom: 20 }}>
                            <span>{showProjectInfo.Title}</span>
                        </div>
                        <ProjectInfo
                            webUrl={showProjectInfo.Path}
                            hideChrome={true}
                            showEditLink={false}
                            showMissingPropsWarning={false}
                            filterField={projectInfoFilterField}
                            labelSize="l"
                            valueSize="m" />
                    </div>
                </Modal>
            );
        }
        return null;
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private fetchData = () => new Promise<Partial<IProjectListState>>((resolve, reject) => {
        Search.query()
            .then(({ primarySearchResults }) => resolve({ projects: primarySearchResults }))
            .catch(reject);
    })
};
