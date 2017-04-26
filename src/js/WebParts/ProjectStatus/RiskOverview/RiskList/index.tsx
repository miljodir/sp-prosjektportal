import * as React from "react";
import { SelectionMode, DetailsList, IColumn } from "office-ui-fabric-react";

export interface IRiskListProps {
    items: any[];
    columns: IColumn[];
}

export interface IRiskListState {
    items: any[];
    columns: IColumn[];
}

export class RiskList extends React.Component<IRiskListProps, IRiskListState> {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            columns: null,
        };
    }

    public componentDidMount(): void {
        let { items, columns } = this.props;
        this.setState({
            items: items.map(i => i.FieldValuesAsHtml),
            columns: columns.filter(c => c),
        });
    }

    public render(): JSX.Element {
        let { items, columns } = this.props;
        return (
            <div className="risk-list ms-Grid">
                <DetailsList
                    items={items}
                    columns={columns}
                    onRenderItemColumn={this.renderItemColumn}
                    onColumnHeaderClick={(ev, col) => {
                        ev.preventDefault();
                        this.onColumnClick(col);
                    }}
                    selectionMode={SelectionMode.none} />
            </div>
        );
    }

    private renderItemColumn = (item: any, index: number, column: IColumn): JSX.Element => {
        const fieldValue = item[column.fieldName];
        switch (column.fieldName) {
            case "GtRiskFactor":
                return <span>{Math.round(+ fieldValue)}</span>;
            default:
                return <span>{fieldValue}</span>;
        }
    }

    private onColumnClick(column: IColumn): void {
        let { items, columns } = this.state;
        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        items = [].concat(items).sort((a, b) => {
            let firstValue = parseFloat(a[column.fieldName]);
            let secondValue = parseFloat(b[column.fieldName]);
            return isSortedDescending ? secondValue - firstValue : firstValue - secondValue;
        });
        this.setState({
            columns: columns.map(col => {
                col.isSorted = (col.key === column.key);
                if (col.isSorted) {
                    col.isSortedDescending = isSortedDescending;
                }
                return col;
            }),
            items: items,
        });
    }
}
export default RiskList;

