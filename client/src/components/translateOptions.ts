// /** TranslateOptions - Validation */
// import Ajv, { JTDDataType, JTDSchemaType } from "ajv/dist/jtd";
// import addFormats from "ajv-formats";

// // import { RJSFSchema } from "@rjsf/utils";

// const ajv = new Ajv({ inlineRefs: true });
// addFormats(ajv);
// export const TranslateOptions: RJSFSchema = {
//     "title": "TranslateOptions",
//     "description": "Options for translating JSON to Pydantic.",
//     "type": "object",
//     "properties": {
//         "targetPythonVersion": {
//             "title": "Target python version",
//             "description": "target python version (default: 3.7)",
//             "default": "3.7",
//             // "advanced": true,

//             // "allOf": [
//             //     {
//             //         "$ref": "#/definitions/PythonVersion"
//             //     }
//             // ],
//             "enum": [
//                 "3.6",
//                 "3.7",
//                 "3.8",
//                 "3.9",
//                 "3.10"
//             ],
//             "type": "string"
//         },
//         "fieldConstraints": {
//             "title": "Field constraints",
//             "description": "Use field constraints and not con* annotations",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "snakeCaseField": {
//             "title": "Snake case field",
//             "description": "Change camel-case field name to snake-case",
//             "default": false,
//             //   "advanced": false,
//             "type": "boolean"
//         },
//         "stripDefaultNone": {
//             "title": "Strip default none",
//             "description": "Strip default None on fields",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "disableTimestamp": {
//             "title": "Disable timestamp",
//             "description": "Disable timestamp on file headers",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "allowPopulationByFieldName": {
//             "title": "Allow population by field name",
//             "description": "Allow population by field name",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "useDefault": {
//             "title": "Use default",
//             "description": "Use default value even if a field is required",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "forceOptional": {
//             "title": "Force optional",
//             "description": "Force optional for required fields",
//             "default": false,
//             //   "advanced": false,
//             "type": "boolean"
//         },
//         "className": {
//             "title": "Class name",
//             "description": "Set class name of root model",
//             "default": "Model",
//             //   "advanced": false,
//             "type": "string"
//         },
//         "useStandardCollections": {
//             "title": "Use standard collections",
//             "description": "Use standard collections for type hinting (list, dict)",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "useSchemaDescription": {
//             "title": "Use schema description",
//             "description": "Use schema description to populate class docstring",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "reuseModel": {
//             "title": "Reuse model",
//             "description": "Re-use models on the field when a module has the model with the same content",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "enumFieldAsLiteral": {
//             "title": "Enum field as literal",
//             "description": "Parse enum field as literal. all: all enum field type are Literal. one: field type is Literal when an enum has only one possible value",
//             "default": "all",
//             // "advanced": true,
//             // "allOf": [
//             //     {
//             //         "$ref": "#/definitions/LiteralType"
//             //     }
//             // ],
//             "enum": [
//                 "all",
//                 "one"
//             ],
//             "type": "string"
//         },
//         "setDefaultEnumMember": {
//             "title": "Set default enum member",
//             "description": "Set enum members as default values for enum field",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "useSubclassEnum": {
//             "title": "Use subclass enum",
//             "description": "Define Enum class as subclass with field type when enum has type (int, float, bytes, str)",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "useGenericContainerTypes": {
//             "title": "Use generic container types",
//             "description": "Use generic container types for type hinting (typing.Sequence, typing.Mapping). If `--use-standard-collections` option is set, then import from collections.abc instead of typing",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "useUnionOperator": {
//             "title": "Use union operator",
//             "description": "Use | operator for Union type (PEP 604).",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "enableFauxImmutability": {
//             "title": "Enable faux immutability",
//             "description": "Enable faux immutability",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "disableAppendingItemSuffix": {
//             "title": "Disable appending item suffix",
//             "description": "Disable appending `Item` suffix to model name in an array",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "strictTypes": {
//             "title": "Strict types",
//             "description": "Use strict types",
//             // "advanced": true,
//             "type": "array",
//             "items": {
//                 // "$ref": "#/definitions/StrictTypes"
//                 "enum": [
//                     "str",
//                     "bytes",
//                     "int",
//                     "float",
//                     "bool"
//                 ],
//                 "type": "string"
//             },
//             "default": []
//         },
//         "emptyEnumFieldName": {
//             "title": "Empty enum field name",
//             "description": "Set field name when enum value is empty",
//             "default": "_",
//             // "advanced": true,
//             "type": "string"
//         },
//         "fieldExtraKeys": {
//             "title": "Field extra keys",
//             "description": "Add extra keys to field parameters",
//             "default": [],
//             // "advanced": true,
//             "type": "array",
//             "items": {
//                 "type": "string"
//             },
//             "uniqueItems": true
//         },
//         "fieldIncludeAllKeys": {
//             "title": "Field include all keys",
//             "description": "Add all keys to field parameters",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "useTitleAsName": {
//             "title": "Use title as name",
//             "description": "use titles as class names of models",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "useAnnotated": {
//             "title": "Use annotated",
//             "description": "Use typing.Annotated for Field(). Also, `--field-constraints` option will be enabled.",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "useNonPositiveNegativeNumberConstrainedTypes": {
//             "title": "Use non positive negative number constrained types",
//             "description": "Use the Non{Positive,Negative}{FloatInt} types instead of the corresponding con* constrained types.",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         },
//         "originalFieldNameDelimiter": {
//             "title": "Original field name delimiter",
//             "description": "Set delimiter to convert to snake case. This option only can be used with --snake-case-field",
//             "default": "_",
//             // "advanced": true,
//             "type": "string"
//         },
//         "useDoubleQuotes": {
//             "title": "Use double quotes",
//             "description": "Model generated with double quotes. Single quotes or your black config skip_string_normalization value will be used without this option.",
//             "default": false,
//             // "advanced": true,
//             "type": "boolean"
//         }
//     },
//     "definitions": {
//         "PythonVersion": {
//             "title": "PythonVersion",
//             "description": "An enumeration.",
//             "enum": [
//                 "3.6",
//                 "3.7",
//                 "3.8",
//                 "3.9",
//                 "3.10"
//             ],
//         },
//         "LiteralType": {
//             "title": "LiteralType",
//             "description": "An enumeration.",
//             "enum": [
//                 "all",
//                 "one"
//             ],
//         },
//         "StrictTypes": {
//             "title": "StrictTypes",
//             "description": "An enumeration.",
//             "enum": [
//                 "str",
//                 "bytes",
//                 "int",
//                 "float",
//                 "bool"
//             ],
//         }
//     },
//     additionalProperties: true
// };

// export type TTranslateOptions = JTDDataType<typeof TranslateOptions>;
// // const a: JTDSchemaType<TTranslateOptions> = TranslateOptions;
// // // type inference is not supported for JTDDataType yet
// // ajv.validateSchema(a);
// // // export const validate = ajv.compile<TTranslateOptions>(TranslateOptions);
// // // export const serialize = ajv.compileSerializer<TTranslateOptions>(TranslateOptions);
export { };