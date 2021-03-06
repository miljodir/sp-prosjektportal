import RESOURCE_MANAGER from "localization";
import { IList } from "sp-pnp-provisioning/lib/schema";
import * as SiteFields from "./SiteFields";

const Lists: IList[] = [
    {
        Title: RESOURCE_MANAGER.getResource("Lists_SitePages_Title"),
        Description: "",
        Template: 119,
        ContentTypesEnabled: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010109010058561F86D956412B9DD7957BBCD67AAE01",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_PhaseChecklist_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070204",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtChecklistStatus", "GtComment"],
            AdditionalSettings: {
                RowLimit: 50,
                ViewQuery: `<OrderBy>
                  <FieldRef Name="GtSortOrder" />
                  <FieldRef Name="ID" />
                </OrderBy>`,
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_GroupedStatus_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtComment"],
            AdditionalSettings: {
                RowLimit: 50,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                  <FieldRef Name="GtChecklistStatus" Ascending="FALSE" />
                </GroupBy>
                <OrderBy>
                    <FieldRef Name="GtSortOrder" />
                    <FieldRef Name="ID" />
                </OrderBy>`,
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_Information_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070207",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectInfoDescription"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_Stakeholders_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070202",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtStakeholderGroup", "GtStakeholderContext", "GtStakeholderStrategy", "GtStakeholderInterest", "GtStakeholderInfluence", "GtStakeholderInfluencePossibilty", "GtStakeholderActions"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_CommunicationPlan_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070203",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: [
            SiteFields.GtCommunicationTarget,
        ],
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtActionDate", "GtActionResponsible"],
            AdditionalSettings: {
                RowLimit: 10,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_Milestones_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x01006E5BC3A4008144DC8ACEC0107AFC999A",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtMilestonePlannedDate", "GtMilestoneActualDate", "GtMilestoneStatus", "GtMilestoneComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
                  <FieldRef Name="GtMilestonePlannedDate" Ascending="TRUE" />
                </OrderBy>`,
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_ProjectLog_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070206",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: process.env.LANGUAGE === 1044 ? [
            SiteFields.GtProjectLogEventLookup,
            SiteFields.GtProjectLogProductLookup,
        ] : [
            SiteFields.GtProjectLogProductLookup,
        ],
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectLogType", "GtProjectLogReporter", "GtProjectLogResponsible", "GtProjectLogConsequence", "GtProjectLogRecommendation", "GtProjectLogExperience"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_ProjectDeliveries_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070205",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: [
            SiteFields.GtProductInteressent,
        ],
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProductPhase", "GtProductQualityResponsible", "GtProductAcceptanceMethod", "GtProductAcceptanceResponsible", "GtProductAcceptanceDate"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_ProductionPhase_DisplayName"),
            ViewFields: ["LinkTitle", "GtProductQualityResponsible", "GtProductAcceptanceMethod", "GtProductAcceptanceResponsible", "GtProductAcceptanceDate"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                <FieldRef Name="GtProductPhase" />
              </GroupBy>`,
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_Uncertainties_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D566346483107020101",
        },
        {
            ContentTypeID: "0x010088578E7470CC4AA68D566346483107020102",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: [
                "ID",
                "LinkTitle",
                "GtRiskProximity",
                "GtRiskProbability",
                "GtRiskConsequence",
                "GtRiskFactor",
                "GtRiskProbabilityPostAction",
                "GtRiskConsequencePostAction",
                "GtRiskFactorPostAction",
                "GtRiskStrategy",
            ],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_Tasks_Title"),
        Description: "",
        Template: 171,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010800233B015F95174C9A8EB505493841DE8D",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: [
            SiteFields.GtProjectTaskComElement,
            SiteFields.GtProjectTaskRisk,
            SiteFields.GtProjectTaskProduct,
            SiteFields.GtProjectTaskChange,
            SiteFields.GtProjectTaskGain,
        ],
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllTasks_DisplayName"),
            ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_RelevantLinks_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectTaskChange", "GtProjectTaskGain", "GtProjectTaskComElement", "GtProjectTaskProduct", "GtProjectTaskRisk"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_BenefitTasks_DisplayName"),
            ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor", "GtProjectTaskGain"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<Where><IsNotNull><FieldRef Name="GtProjectTaskGain" /></IsNotNull></Where>`,
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_MeetingCalendar_Title"),
        Description: "",
        Template: 106,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010200A2B2AC17A2244B8590398A9D1E7E3E3701",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: process.env.LANGUAGE === 1044 ? [
            SiteFields.GtProjectEventDateAndTitle,
        ] : [],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_Documents_Title"),
        Description: "",
        Template: 101,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010100293FDE3FCADA480B9A77BBDAD7DFA28C01",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllDocuments_DisplayName"),
            ViewFields: ["DocIcon", "LinkFilename", "GtProjectPhase", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_ProjectStatus_Title"),
        Description: "",
        Template: 101,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x010100293FDE3FCADA480B9A77BBDAD7DFA28C02",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllDocuments_DisplayName"),
            ViewFields: ["DocIcon", "LinkFilename", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
                  <FieldRef Name="ID" Ascending="FALSE" />
                </OrderBy>`,
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_BenefitsAnalysis_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x0100B384774BA4EBB842A5E402EBF4707367",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        Fields: [
            SiteFields.GtChangeLookup,
        ],
        FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: true,
            DisplayName: RESOURCE_MANAGER.getResource("Lists_BenefitsAnalysis_Fields_Title_DisplayName"),
        }],
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtChangeLookup", "GtGainsType", "GtGainsTurnover", "GtGainsResponsible", "GtMeasureIndicator", "GtStartValue", "GtDesiredValue", "GtMeasurementUnit", "GtRealizationTime"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_GroupedBenefitType_DisplayName"),
            ViewFields: ["GtChangeLookup", "Title", "GtGainsTurnover", "GtGainsResponsible", "GtMeasureIndicator", "GtStartValue", "GtDesiredValue", "GtMeasurementUnit", "GtRealizationTime"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                  <FieldRef Name="GtGainsType" Ascending="FALSE" />
                </GroupBy>
                <OrderBy>
                  <FieldRef Name="ID" />
                </OrderBy>`,
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_ChangeAnalysis_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x01004D8897A0212F9A40A4C2209D89E5AD4C",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: true,
            DisplayName: "Endring",
        }],
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProcess", "GtChallengeDescription"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
                  <FieldRef Name="ID" />
                </OrderBy>`,
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_GroupedProcess_DisplayName"),
            ViewFields: ["GtChallengeDescription", "LinkTitle"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                  <FieldRef Name="GtProcess" Ascending="FALSE" />
                </GroupBy>
                <OrderBy>
                  <FieldRef Name="ID" />
                </OrderBy>`,
            },
        }],
    },
    {
        Title: RESOURCE_MANAGER.getResource("Lists_BenefitsFollowup_Title"),
        Description: "",
        Template: 100,
        ContentTypesEnabled: true,
        RemoveExistingContentTypes: true,
        ContentTypeBindings: [{
            ContentTypeID: "0x01007A831AC68204F04AAA022CFF06C7BAA2",
        }],
        AdditionalSettings: {
            EnableVersioning: true,
        },
        FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: false,
            Hidden: true,
        }],
        Fields: [
            SiteFields.GtGainLookup,
            SiteFields.GtMeasureIndicatorLookup,
            SiteFields.GtGainLookup_ID,
        ],
        Views: [{
            Title: RESOURCE_MANAGER.getResource("View_AllItems_DisplayName"),
            ViewFields: ["GtMeasurementDate", "GtMeasurementValue", "GtMeasureIndicatorLookup", "GtMeasurementComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                                <FieldRef Name="GtGainLookup" />
                            </GroupBy>
                            <OrderBy>
                                <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                            </OrderBy>`,
            },
        },
        {
            Title: RESOURCE_MANAGER.getResource("View_Flat_DisplayName"),
            ViewFields: ["GtGainLookup", "GtMeasurementDate", "GtMeasurementValue", "GtMeasureIndicatorLookup", "GtMeasurementComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
                                <FieldRef Name="GtGainLookup" />
                                <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                            </OrderBy>`,
            },
        }],
    },
];

export default Lists;
