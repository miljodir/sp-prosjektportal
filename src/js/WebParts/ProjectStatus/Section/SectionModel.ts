
import * as Util from "../../../Util";

export enum SectionType {
    StatusSection,
    RiskSection,
    ProjectPropertiesSection,
    ListSection,
}

export default class SectionModel {
    public name: string;
    public iconName: string;
    public source: string;
    public listTitle: string;
    public viewQuery: string;
    public viewFields: string[];
    public rowLimit: number;
    public fieldName: string;
    public showRiskMatrix: boolean;
    public showInNavbar: boolean;
    public showInStatusSection: boolean;
    public showAsSection: boolean;
    public customComponent: string;
    public statusValue: string;
    public statusComment?: string;
    private contentTypeId: string;

    /**
     * Constructor
     *
     * @param obj Section object
     * @param projet Project properties
     */
    constructor(obj: any, project: any) {
        this.name = obj.Title;
        this.iconName = obj.GtStSecIcon;
        this.source = obj.GtStSecSource;
        this.listTitle = obj.GtStSecList;
        this.viewQuery = obj.GtStSecViewQuery;
        this.viewFields = obj.GtStSecViewFields ? obj.GtStSecViewFields.split(",") : [];
        this.rowLimit = obj.GtStSecRowLimit;
        this.fieldName = obj.GtStSecFieldName;
        this.showRiskMatrix = obj.GtStSecShowRiskMatrix;
        this.showInNavbar = obj.GtStSecShowInNavbar;
        this.showInStatusSection = obj.GtStSecShowInStatusSection;
        this.showAsSection = obj.GtStSecShowAsSection;
        this.customComponent = obj.GtStSecCustomComponent;
        this.contentTypeId = obj.ContentTypeId;

        if (this.getType() === SectionType.RiskSection) {
            this.listTitle = "Usikkerhet";
            this.fieldName = "GtStatusRisk";
        }
        if (this.fieldName) {
            const commentFieldName = `${this.fieldName}Comment`;
            this.statusValue = project.hasOwnProperty(this.fieldName) ? project[this.fieldName] : "";
            this.statusComment = project.hasOwnProperty(commentFieldName) ? project[commentFieldName] : "";
        }
    }

    /**
     * Get type
     */
    public getType(): SectionType {
        if (this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82802") !== -1) {
            return SectionType.StatusSection;
        }
        if (this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82803") !== -1) {
            return SectionType.ProjectPropertiesSection;
        }
        if (this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82804") !== -1) {
            return SectionType.RiskSection;
        }
        if (this.contentTypeId.indexOf("0x01004CEFE616A94A3A48A27D9DEBDF5EC82805") !== -1) {
            return SectionType.ListSection;
        }
    }

    public getHtmlElementId(element?: string): string {
        if (element) {
            return `section-${Util.cleanString(this.name)}-${element}`;
        } else {
            return `section-${Util.cleanString(this.name)}`;
        }
    }

    /**
     * Checks if section is valid
     */
    public isValid(): boolean {
        return (this.statusValue !== "" && this.statusValue !== null) || this.getType() === SectionType.ListSection;
    }
}
