"""Models

SEE: https://github.com/pydantic/pydantic/blob/main/docs/build/schema_mapping.py

# Uniforms does thuis well..

# https://uniforms.tools/playground/#?N4IgDgTgpgzlAuIBcICCATd0YwAQAoApAZQHkA5YgYwAsoBbAQwEoQAacCAezBmVEYBXeFxiMAblGQAzRgBs4HISLGSAIlDmMAnsgCMABgMd0ASzEAjOVHQz5ikFoubk8CIKgcwWqlBpc5dCgIOwVPEGhGdFIAOzldJFkwjhhaBkZkEHx8ZlwAXgA-XGAAHRjcXCouGJh4XEYAK3F83BioAHdcVCb8YHq5OQBRCG4IGCRcNw82XEE4DVlBOXhxyfdPXABrKG12rgh0VYBtEpBBGNNpffoYU4BdXABfZgBuMoqqmrrUuiYW0pA8FM8GspwmpwAKhBGDUtPAoKQwEDqrd2LhTkFUhBTEjTNUweiQIjkTVcFcIGsYTA4aYYgBzXAkCiTLi4AAK2nQMKBVAAdKcZqd4NowFACacuBYGlAqPABYTIDxgkDYASATAYoxtgBhRhwABipk06DVQuBoOQhOImu2lT1UDJRsC8oxsCo2Nx-Mtp21NBhdIdVEY9E0AFog3BHcbWsGHSJcBqtVBw_aXSAgotlgSkooKkKRWLvSALFwAlAYadHoKQOTfMS8Zq5KbAebC-CQPr9r5cDwSfI05j3TiSeKO12Hb2G_IyftcNAAI6CUzQdBRwKo6sZoRZy05jaE4Wi0clssVkBVwlULQ4cix5tAkFtwna694TUhgduj0jovEBCVV8YxDHtpDnUs6noLggibNFXUzOUiwAWSgzQ00PJ9TlqbF6Urat4EYCAA3gDl4H8GIADVghgBt71bUcIQIojcDAbRSOqXBJDGGjYPTL9h249t8MI_8WLY8pOOo9j8C3JZ4AmABmXkAHZmAFfMj2QTC3FpOlTlwTcoHg0dFKU-VCXkORSGkAkjgBAASaBrKLABiAB6DNaWBBsYFckiyMorivUeO5HgvODPJJVEJgBPzqgCySYlox9R1iiiqO4gysX4r121QcooBiQQQ2hEl-R4gqips05FIANjTEz6t5AAORqAE5GsMe5QseN5EvKMlzllBtKkieFyPkUwuRECB8B-dJclKfqPhROpxAmqbZzyeoml5Kp6DAUxrFmtImFeMp3gqOcEEECBynwSDoNyQpiguy6OPWxhpvulC5DOvq3oqS4CDWuRJs-_ZeWCUY8AAMhh97QY2iBIZGfYYF5ax6VIhbXoB6B4Bu8o-iCfDDtWEGwemlHoaeXqAaeXGeoux5zv6z5agTE7GHGxHwYpLb3XLMaPq-ubTt6i78cJ1oOkZMhKC5gAhbF0ADY7fkYGYxe5kX9j-54cnYEAYH8doAEk4lpKBhlGUIHD1bQYioWJiEECx6GBO3wgdp3Yh5ympESewoCrQFfkDs4vm0axbEeIA
"""
from typing import Any, Optional

from pydantic import BaseModel, Field, Json

from datamodel_code_generator.format import (
    PythonVersion,
)
import humps
from pydantic.schema import encode_default
from pydantic.fields import ModelField


def _schema_extra_get_field(name: str, model: type["AppBaseModel"]) -> ModelField:
    f = model.__fields__.get(humps.decamelize(name))
    assert f
    return f


def _schema_extra_add_default_from_factory(
    name: str, prop: dict[str, Any], field: ModelField
) -> None:
    if hasattr(prop, "default"):
        return
    assert field
    if field.default_factory:
        v = field.default_factory()
        prop["default"] = encode_default(v)


class AppBaseModel(BaseModel):
    class Config:
        alias_generator = humps.camelize

        @staticmethod
        def schema_extra(schema: dict[str, Any], model: type["AppBaseModel"]) -> None:
            for name, prop in schema.get("properties", {}).items():
                f = _schema_extra_get_field(name=name, model=model)
                _schema_extra_add_default_from_factory(name=name, prop=prop, field=f)


class TranslateRequest(AppBaseModel):
    data: Json
    options: "TranslateOptions"


# class TranslateOptions(BaseModel):
#     force_optional: bool = Field(
#         default=False,
#         alias="forceOptional",
#         description="Force everything to be optional.",
#         title="Force optiasfonal",
#         detail=True,
#     )
#     snake_cased: bool = Field(default=False, alias="snakeCased")


class TranslateResponse(AppBaseModel):
    py: dict[str, str] = Field(
        description="Keys are 'paths' while values contain the data."
    )


class TranslateOptions(AppBaseModel):
    """Options for translating JSON to Pydantic."""

    snake_case_field: bool = Field(
        default=False,
        title="Snake case field",
        description="Change camel-case field name to snake-case",
        # advanced=False,
    )
    force_optional: bool = Field(
        default=False,
        title="Force optional",
        description="Force optional for required fields",
        # advanced=False,
    )
    class_name: str = Field(
        default="Model",
        title="Class name",
        description="Set class name of root model",
        # advanced=False,
    )
    target_python_version: PythonVersion = Field(
        default=PythonVersion.PY_37,
        title="Target python version",
        description="target python version (default: 3.7)",
        # advanced=True,
    )

    # field_constraints: bool = Field(
    #     default=False,
    #     title="Field constraints",
    #     description="Use field constraints and not con* annotations",
    #     advanced=True,
    # )

    # strip_default_none: bool = Field(
    #     default=False,
    #     title="Strip default none",
    #     description="Strip default None on fields",
    #     advanced=True,
    # )
    # # aliases: Optional[TextIOBase] = Field(
    # #     default=None, title="Aliases", description="Alias mapping file", advanced=True
    # # )
    # disable_timestamp: bool = Field(
    #     default=False,
    #     title="Disable timestamp",
    #     description="Disable timestamp on file headers",
    #     advanced=True,
    # )
    # allow_population_by_field_name: bool = Field(
    #     default=False,
    #     title="Allow population by field name",
    #     description="Allow population by field name",
    #     advanced=True,
    # )
    # use_default: bool = Field(
    #     default=False,
    #     title="Use default",
    #     description="Use default value even if a field is required",
    #     advanced=True,
    # )

    # use_standard_collections: bool = Field(
    #     default=False,
    #     title="Use standard collections",
    #     description="Use standard collections for type hinting (list, dict)",
    #     advanced=True,
    # )
    # use_schema_description: bool = Field(
    #     default=False,
    #     title="Use schema description",
    #     description="Use schema description to populate class docstring",
    #     advanced=True,
    # )
    # reuse_model: bool = Field(
    #     default=False,
    #     title="Reuse model",
    #     description="Re-use models on the field when a module has the model with the same content",
    #     advanced=True,
    # )
    # enum_field_as_literal: LiteralType = Field(
    #     default="all",
    #     title="Enum field as literal",
    #     description="Parse enum field as literal. all: all enum field type are Literal. one: field type is Literal when an enum has only one possible value",
    #     advanced=True,
    # )
    # set_default_enum_member: bool = Field(
    #     default=False,
    #     title="Set default enum member",
    #     description="Set enum members as default values for enum field",
    #     advanced=True,
    # )
    # use_subclass_enum: bool = Field(
    #     default=False,
    #     title="Use subclass enum",
    #     description="Define Enum class as subclass with field type when enum has type (int, float, bytes, str)",
    #     advanced=True,
    # )
    # use_generic_container_types: bool = Field(
    #     default=False,
    #     title="Use generic container types",
    #     description="Use generic container types for type hinting (typing.Sequence, typing.Mapping). If `--use-standard-collections` option is set, then import from collections.abc instead of typing",
    #     advanced=True,
    # )
    # use_union_operator: bool = Field(
    #     default=False,
    #     title="Use union operator",
    #     description="Use | operator for Union type (PEP 604).",
    #     advanced=True,
    # )
    # enable_faux_immutability: bool = Field(
    #     default=False,
    #     title="Enable faux immutability",
    #     description="Enable faux immutability",
    #     advanced=True,
    # )
    # disable_appending_item_suffix: bool = Field(
    #     default=False,
    #     title="Disable appending item suffix",
    #     description="Disable appending `Item` suffix to model name in an array",
    #     advanced=True,
    # )
    # strict_types: List[StrictTypes] = Field(
    #     default_factory=list,
    #     title="Strict types",
    #     description="Use strict types",
    #     advanced=True,
    # )
    # empty_enum_field_name: str = Field(
    #     default="_",
    #     title="Empty enum field name",
    #     description="Set field name when enum value is empty",
    #     advanced=True,
    # )
    # field_extra_keys: Set[str] = Field(
    #     default=set(),
    #     # default_factory=set,
    #     title="Field extra keys",
    #     description="Add extra keys to field parameters",
    #     advanced=True,
    # )
    # field_include_all_keys: bool = Field(
    #     default=False,
    #     title="Field include all keys",
    #     description="Add all keys to field parameters",
    #     advanced=True,
    # )
    # use_title_as_name: bool = Field(
    #     default=False,
    #     title="Use title as name",
    #     description="use titles as class names of models",
    #     advanced=True,
    # )
    # use_annotated: bool = Field(
    #     default=False,
    #     title="Use annotated",
    #     description="Use typing.Annotated for Field(). Also, `--field-constraints` option will be enabled.",
    #     advanced=True,
    # )
    # use_non_positive_negative_number_constrained_types: bool = Field(
    #     default=False,
    #     title="Use non positive negative number constrained types",
    #     description="Use the Non{Positive,Negative}{FloatInt} types instead of the corresponding con* constrained types.",
    #     advanced=True,
    # )
    # original_field_name_delimiter: str = Field(
    #     default="_",
    #     title="Original field name delimiter",
    #     description="Set delimiter to convert to snake case. This option only can be used with --snake-case-field",
    #     advanced=True,
    # )
    # use_double_quotes: bool = Field(
    #     default=False,
    #     title="Use double quotes",
    #     description="Model generated with double quotes. Single quotes or your black config skip_string_normalization value will be used without this option.",
    #     advanced=True,
    # )

    # @root_validator
    # def validate_use_generic_container_types(
    #     cls, values: Dict[str, Any]
    # ) -> Dict[str, Any]:
    #     if values.get("use_generic_container_types"):
    #         target_python_version: PythonVersion = values["target_python_version"]
    #         if target_python_version == target_python_version.PY_36:
    #             raise Error(
    #                 f"`--use-generic-container-types` can not be used with `--target-python_version` {target_python_version.PY_36.value}.\n"  # type: ignore
    #                 " The version will be not supported in a future version"
    #             )
    #     return values

    # @root_validator
    # def validate_original_field_name_delimiter(
    #     cls, values: Dict[str, Any]
    # ) -> Dict[str, Any]:
    #     if values.get("original_field_name_delimiter") is not None:
    #         if not values.get("snake_case_field"):
    #             raise Exception(
    #                 "`--original-field-name-delimiter` can not be used without `--snake-case-field`."
    #             )
    #     return values

    # @root_validator()
    # def validate_root(cls, values: Dict[str, Any]) -> Dict[str, Any]:
    #     values = cls._validate_use_annotated(values)
    #     return cls._validate_use_union_operator(values)

    # @classmethod
    # def _validate_use_annotated(cls, values: Dict[str, Any]) -> Dict[str, Any]:
    #     if values.get("use_annotated"):
    #         values["field_constraints"] = True
    #     return values

    # @classmethod
    # def _validate_use_union_operator(cls, values: Dict[str, Any]) -> Dict[str, Any]:
    #     if values.get("use_union_operator"):
    #         target_python_version: PythonVersion = values.get(
    #             "target_python_version", PythonVersion.PY_37
    #         )
    #         if not target_python_version.has_union_operator:
    #             warn(
    #                 f"`--use-union-operator` can not be used with `--target-python_version` {target_python_version.value}.\n"
    #                 f"`--target-python_version` {PythonVersion.PY_310.value} will be used."
    #             )
    #             values["target_python_version"] = PythonVersion.PY_310
    #     return values
