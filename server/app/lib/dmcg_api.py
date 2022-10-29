from datetime import datetime, timezone

# from enum import Enum
from pathlib import Path
from typing import (
    IO,
    TYPE_CHECKING,
    Any,
    Callable,
    DefaultDict,
    Dict,
    List,
    Mapping,
    Optional,
    Sequence,
    Set,
    Tuple,
    Type,
    Union,
)
from urllib.parse import ParseResult


if TYPE_CHECKING:
    cached_property = property
    Protocol = object
    runtime_checkable: Callable[..., Any]

from datamodel_code_generator.format import PythonVersion
from datamodel_code_generator.model.pydantic import dump_resolve_reference_action
from datamodel_code_generator.parser import DefaultPutDict, LiteralType
from datamodel_code_generator.parser.base import Parser
from datamodel_code_generator.types import StrictTypes
from datamodel_code_generator import (
    InputFileType,
    DEFAULT_BASE_CLASS,
    OpenAPIScope,
    get_first_file,
    load_yaml,
    RAW_DATA_TYPES,
    Error,
)


def generate(
    input_: Union[Path, str, ParseResult],
    *,
    input_filename: Optional[str] = None,
    input_file_type: InputFileType = InputFileType.Auto,
    target_python_version: PythonVersion = PythonVersion.PY_37,
    base_class: str = DEFAULT_BASE_CLASS,
    custom_template_dir: Optional[Path] = None,
    extra_template_data: Optional[DefaultDict[str, Dict[str, Any]]] = None,
    validation: bool = False,
    field_constraints: bool = False,
    snake_case_field: bool = False,
    strip_default_none: bool = False,
    aliases: Optional[Mapping[str, str]] = None,
    disable_timestamp: bool = False,
    allow_population_by_field_name: bool = False,
    apply_default_values_for_required_fields: bool = False,
    force_optional_for_required_fields: bool = False,
    class_name: Optional[str] = None,
    use_standard_collections: bool = False,
    use_schema_description: bool = False,
    reuse_model: bool = False,
    encoding: str = "utf-8",
    enum_field_as_literal: Optional[LiteralType] = None,
    set_default_enum_member: bool = False,
    use_subclass_enum: bool = False,
    strict_nullable: bool = False,
    use_generic_container_types: bool = False,
    enable_faux_immutability: bool = False,
    disable_appending_item_suffix: bool = False,
    strict_types: Optional[Sequence[StrictTypes]] = None,
    empty_enum_field_name: Optional[str] = None,
    custom_class_name_generator: Optional[Callable[[str], str]] = None,
    field_extra_keys: Optional[Set[str]] = None,
    field_include_all_keys: bool = False,
    openapi_scopes: Optional[List[OpenAPIScope]] = None,
    wrap_string_literal: Optional[bool] = None,
    use_title_as_name: bool = False,
    http_headers: Optional[Sequence[Tuple[str, str]]] = None,
    http_ignore_tls: bool = False,
    use_annotated: bool = False,
    use_non_positive_negative_number_constrained_types: bool = False,
    original_field_name_delimiter: Optional[str] = None,
    use_double_quotes: bool = False,
    use_union_operator: bool = False,
) -> dict[str, str]:
    """Will be almost identical to what is seen in `datamodel_code_generator.__init__`.

    Make a few tweaks around the edges:

    - Don't assume writing out to file or stdout. Instead, return a dict of "files" with their generated code.
    - A few more tweaks realted to what can and can't happen when no file system.

    """
    remote_text_cache: DefaultPutDict[str, str] = DefaultPutDict()
    if isinstance(input_, str):
        input_text: Optional[str] = input_
    elif isinstance(input_, ParseResult):
        from datamodel_code_generator.http import get_body

        input_text = remote_text_cache.get_or_put(
            input_.geturl(),
            default_factory=lambda url: get_body(url, http_headers, http_ignore_tls),
        )
    else:
        input_text = None

    if isinstance(input_, Path) and not input_.is_absolute():
        input_ = input_.expanduser().resolve()
    if input_file_type == InputFileType.Auto:
        try:
            input_text_ = (
                get_first_file(input_).read_text(encoding=encoding)
                if isinstance(input_, Path)
                else input_text
            )
            input_file_type = (
                InputFileType.OpenAPI
                if is_openapi(input_text_)  # type: ignore
                else InputFileType.JsonSchema
            )
        except:
            raise Error("Invalid file format")

    kwargs: Dict[str, Any] = {}
    if input_file_type == InputFileType.OpenAPI:
        from datamodel_code_generator.parser.openapi import OpenAPIParser

        parser_class: Type[Parser] = OpenAPIParser
        kwargs["openapi_scopes"] = openapi_scopes
    else:
        from datamodel_code_generator.parser.jsonschema import JsonSchemaParser

        parser_class = JsonSchemaParser

        if input_file_type in RAW_DATA_TYPES:
            try:
                if isinstance(input_, Path) and input_.is_dir():  # pragma: no cover
                    raise Error(f"Input must be a file for {input_file_type}")
                obj: Dict[Any, Any]
                if input_file_type == InputFileType.CSV:
                    import csv

                    def get_header_and_first_line(csv_file: IO[str]) -> Dict[str, Any]:
                        csv_reader = csv.DictReader(csv_file)
                        return dict(zip(csv_reader.fieldnames, next(csv_reader)))  # type: ignore

                    if isinstance(input_, Path):
                        with input_.open(encoding=encoding) as f:
                            obj = get_header_and_first_line(f)
                    else:
                        import io

                        obj = get_header_and_first_line(io.StringIO(input_text))
                else:
                    obj = load_yaml(
                        input_.read_text(encoding=encoding)  # type: ignore
                        if isinstance(input_, Path)
                        else input_text
                    )
            except:
                raise Error("Invalid file format")
            import json

            from genson import SchemaBuilder

            builder = SchemaBuilder()
            builder.add_object(obj)
            input_text = json.dumps(builder.to_schema())

    if isinstance(input_, ParseResult) and input_file_type not in RAW_DATA_TYPES:
        input_text = None
    parser = parser_class(
        source=input_text or input_,
        base_class=base_class,
        custom_template_dir=custom_template_dir,
        extra_template_data=extra_template_data,
        target_python_version=target_python_version,
        dump_resolve_reference_action=dump_resolve_reference_action,
        validation=validation,
        field_constraints=field_constraints,
        snake_case_field=snake_case_field,
        strip_default_none=strip_default_none,
        aliases=aliases,
        allow_population_by_field_name=allow_population_by_field_name,
        apply_default_values_for_required_fields=apply_default_values_for_required_fields,
        force_optional_for_required_fields=force_optional_for_required_fields,
        class_name=class_name,
        use_standard_collections=use_standard_collections,
        base_path=input_.parent
        if isinstance(input_, Path) and input_.is_file()
        else None,
        use_schema_description=use_schema_description,
        reuse_model=reuse_model,
        enum_field_as_literal=enum_field_as_literal,
        set_default_enum_member=set_default_enum_member,
        use_subclass_enum=use_subclass_enum,
        strict_nullable=strict_nullable,
        use_generic_container_types=use_generic_container_types,
        enable_faux_immutability=enable_faux_immutability,
        remote_text_cache=remote_text_cache,
        disable_appending_item_suffix=disable_appending_item_suffix,
        strict_types=strict_types,
        empty_enum_field_name=empty_enum_field_name,
        custom_class_name_generator=custom_class_name_generator,
        field_extra_keys=field_extra_keys,
        field_include_all_keys=field_include_all_keys,
        wrap_string_literal=wrap_string_literal,
        use_title_as_name=use_title_as_name,
        http_headers=http_headers,
        http_ignore_tls=http_ignore_tls,
        use_annotated=use_annotated,
        use_non_positive_negative_number_constrained_types=use_non_positive_negative_number_constrained_types,
        original_field_name_delimiter=original_field_name_delimiter,
        use_double_quotes=use_double_quotes,
        use_union_operator=use_union_operator,
        **kwargs,
    )

    # with chdir(output): # TODO What is this?
    results = parser.parse()  # <~~~ Big line
    if not input_filename:  # pragma: no cover
        if isinstance(input_, str):
            input_filename = "<stdin>"
        elif isinstance(input_, ParseResult):
            input_filename = input_.geturl()
        else:
            input_filename = input_.name
    if not results:
        raise Error("Models not found in the input data")
    elif isinstance(results, str):
        # Previously the key here was "out"
        modules = {"main.py": (results, input_filename)}
    else:
        raise NotImplementedError(
            "Do not support modular reference yet. Can in the future..."
        )
        # if output is None:
        #     raise Error("Modular references require an output directory")
        # if output.suffix:
        #     raise Error("Modular references require an output directory, not a file")
        # modules = {
        #     output.joinpath(*name): (
        #         result.body,
        #         str(result.source.as_posix() if result.source else input_filename),
        #     )
        #     for name, result in sorted(results.items())
        # }

    timestamp = datetime.now(timezone.utc).replace(microsecond=0).isoformat()

    header = """\
# generated by datamodel-codegen:
#   filename:  {}"""
    if not disable_timestamp:
        header += f"\n#   timestamp: {timestamp}"

    outputs: dict[str, str] = {}
    for i, (path, body_and_filename) in enumerate(modules.items()):
        lines: list[str] = []
        body, filename = body_and_filename
        # Normal version will possibly write to disk here.

        lines.append(header.format(filename))
        if body:
            lines.append("")
            lines.append(body.rstrip())

        outputs[path or f"main{i}.py"] = "\n".join(lines)

    return outputs


__all__ = ["DefaultPutDict", "LiteralType", "PythonVersion"]
