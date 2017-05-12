import * as React from "react";
import * as unique from "array-unique";
import {
    DetailsList,
    IGroup,
    SelectionMode,
    Spinner,
    SpinnerType,
    SearchBox,
    ContextualMenuItemType,
    CommandBar,
} from "office-ui-fabric-react";
import DataSource from "../DataSource";
import { _onRenderItemColumn } from "./Columns";
import * as Data from "./Data";
import IGainsOverviewProps from "./IGainsOverviewProps";
import IGainsOverviewState from "./IGainsOverviewState";

/**
 * Gains Overview
 */
export default class GainsOverview extends React.PureComponent<IGainsOverviewProps, IGainsOverviewState> {
    public static defaultProps: Partial<IGainsOverviewProps> = {
        groupByOptions: [{ name: "Prosjekt", key: "SiteTitle" }],
        searchProperty: "Title",
        dataSource: DataSource.List,
        showCommandBar: true,
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            isLoading: true,
            searchTerm: "",
            groupBy: {
                key: "NoGrouping",
                name: __("String_NoGrouping"),
            },
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        let { dataSource } = this.props;
        Data.retrieveFromSource(dataSource).then(data => this.setState({ data: data, isLoading: false }));
    }

    /**
     * Render the component
     */
    public render(): JSX.Element {
        const {
            showSearchBox,
            showCommandBar,
         } = this.props;

        const {
            isLoading,
            data,
        } = this.state;

        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }
        if (data) {
            let { items, columns, groups } = this.getFilteredData();
            return (<div style={{ width: "100%" }}>
                {showCommandBar && this.renderCommandBar()}
                <div style={{ height: 10 }}></div>
                {showSearchBox !== false &&
                    <SearchBox
                        onChange={st => this.setState({ searchTerm: st.toLowerCase() })}
                        labelText={__("GainsOverview_SearchBox_Placeholder")} />
                }
                <DetailsList
                    items={items}
                    columns={columns}
                    groups={groups}
                    selectionMode={SelectionMode.none}
                    onRenderItemColumn={_onRenderItemColumn}
                    onColumnHeaderClick={(col, evt) => this._onColumnClick(col, evt)}
                />
            </div>);
        }
        return null;
    }

    /**
     * Renders the command bar from office-ui-fabric-react
     */
    private renderCommandBar = () => {
        const {
            groupBy,
         } = this.state;

        const { groupByOptions } = this.props;

        const items = [];
        const farItems = [];

        const noGrouping = {
            key: "NoGrouping",
            name: __("String_NoGrouping"),
        };
        items.push({
            key: "Group",
            name: groupBy.name,
            iconProps: { iconName: "GroupedList" },
            itemType: ContextualMenuItemType.Header,
            onClick: e => e.preventDefault(),
            items: [
                {
                    ...noGrouping,
                },
                ...groupByOptions,
            ].map(item => ({
                ...item,
                onClick: e => {
                    e.preventDefault();
                    this.setState({ groupBy: item });
                },
            })),
        });

        return <CommandBar
            items={items}
            farItems={farItems}
        />;
    }

    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     *
     * @param items Item collection
     * @param columns Column collection
     * @param groups Group collection
     */
    private getFilteredData = (): { items: any[], columns: any[], groups: IGroup[] } => {
        const {
            groupBy,
            data,
            searchTerm,
        } = this.state;

        const { searchProperty } = this.props;

        let columns = [].concat(data.columns);
        let groups: IGroup[] = null;
        if (groupBy.key !== "NoGrouping") {
            const groupItems = data.items.sort((a, b) => a[groupBy.key] > b[groupBy.key] ? -1 : 1);
            const groupNames = groupItems.map(g => g[groupBy.key]);
            groups = unique([].concat(groupNames)).map((name, idx) => ({
                key: idx,
                name: `${groupBy.name}: ${name}`,
                startIndex: groupNames.indexOf(name, 0),
                count: [].concat(groupNames).filter(n => n === name).length,
                isCollapsed: false,
                isShowingAll: true,
                isDropEnabled: false,
            }));
        }
        const filteredItems = data.items.filter(item => item[searchProperty].toLowerCase().indexOf(searchTerm) !== -1);
        return {
            items: filteredItems,
            columns: columns,
            groups: groups,
        };
    }

    /**
     * Sorting on column click
     */
    private _onColumnClick = (event, column): any => {
        const { data } = this.state;

        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        let items = data.items.concat([]).sort((a, b) => {
            let firstValue = a[column.fieldName];
            let secondValue = b[column.fieldName];
            if (isSortedDescending) {
                return firstValue > secondValue ? -1 : 1;
            } else {
                return firstValue > secondValue ? 1 : -1;
            }
        });
        let columns = data.columns.map(col => {
            col.isSorted = (col.key === column.key);
            if (col.isSorted) {
                col.isSortedDescending = isSortedDescending;
            }
            return col;
        });
        this.setState({
            data: {
                items: items,
                columns: columns,
            },
        });
    }
};
