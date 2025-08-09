"use client";

import { Paintbrush } from "lucide-react";
import { useCallback, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utilities/cn";

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
  colors?: (string | { value: string; label: string })[];
  className?: string;
  showColorPicker?: boolean;
  gridView?: boolean;
};

export const ColorPicker = ({
  color,
  onChange,
  colors = [
    "#000000",
    "#374151",
    "#6B7280",
    "#9CA3AF",
    "#D1D5DB",
    "#E5E7EB",
    "#F3F4F6",
    "#FFFFFF",
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#EAB308",
    "#84CC16",
    "#22C55E",
    "#10B981",
    "#06B6D4",
    "#0EA5E9",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#A855F7",
    "#D946EF",
    "#EC4899",
    "#F43F5E",
  ],
  className,
  showColorPicker = true,
  gridView = true,
}: ColorPickerProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = useCallback(
    (newColor: string) => {
      if (newColor !== color) {
        onChange(newColor);
      }
    },
    [color, onChange],
  );

  const handleReset = useCallback(() => {
    if (color !== "") {
      onChange("");
    }
  }, [color, onChange]);

  const isGridView = gridView && typeof colors[0] === "string";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-payload-elevation-50 border-payload-elevation-150 h-10 justify-start text-left font-normal",
            !color && "text-muted-foreground",
            className,
          )}
        >
          <div className="flex w-full items-center gap-2">
            {color ? (
              <div className="h-4 w-4 rounded" style={{ backgroundColor: color }} />
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="flex-1 truncate">{color || "Pick a color"}</div>
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-payload-elevation-50 border-payload-elevation-150 w-64 p-0">
        <div className="flex flex-col">
          {!showPicker ? (
            <div
              className={cn(
                "p-2",
                isGridView ? "grid grid-cols-6 gap-2" : "flex max-h-64 flex-col gap-1 overflow-y-auto",
              )}
            >
              {colors.map((colorItem) => {
                const colorValue = typeof colorItem === "string" ? colorItem : colorItem.value;
                const colorLabel = typeof colorItem === "string" ? colorItem : colorItem.label;

                return (
                  <button
                    key={colorValue}
                    onClick={() => handleColorChange(colorValue)}
                    className={cn(
                      "overflow-hidden rounded border-2 transition-all hover:scale-105",
                      color === colorValue ? "border-payload-elevation-900" : "border-payload-elevation-150",
                      isGridView ? "aspect-square h-auto w-full p-0" : "flex items-center gap-2 p-2",
                    )}
                  >
                    {isGridView ? (
                      <div className="h-full w-full" style={{ backgroundColor: colorValue }} />
                    ) : (
                      <>
                        <div
                          className="h-6 w-6 flex-shrink-0 rounded border"
                          style={{ backgroundColor: colorValue }}
                        />
                        <span className="text-sm">{colorLabel}</span>
                      </>
                    )}
                  </button>
                );
              })}

              <button
                onClick={handleReset}
                className={cn(
                  "border-payload-elevation-150 overflow-hidden rounded border-2 transition-all hover:scale-105",
                  isGridView ? "aspect-square h-auto w-full p-0" : "flex items-center gap-2 p-2",
                )}
              >
                {isGridView ? (
                  <div className="bg-payload-elevation-50 relative h-full w-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-0.5 w-full rotate-45 bg-red-500" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="border-payload-elevation-150 bg-payload-elevation-50 relative h-6 w-6 flex-shrink-0 rounded border">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-0.5 w-full rotate-45 bg-red-500" />
                      </div>
                    </div>
                    <span className="text-sm">Reset</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 p-2">
              <HexColorPicker
                color={color}
                onChange={handleColorChange}
                style={{
                  width: "100%",
                  height: "150px",
                }}
              />

              <Input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                placeholder="#000000"
                className="bg-payload-elevation-50 border-payload-elevation-150 text-payload-elevation-900 h-8"
              />

              <div className="flex w-full gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="bg-payload-elevation-900 text-payload-elevation-50 hover:bg-payload-elevation-700 w-full flex-1 cursor-pointer border-0 border-transparent transition-colors"
                >
                  Reset
                </Button>
              </div>
            </div>
          )}

          {showColorPicker && (
            <div className="border-payload-elevation-150 border-t p-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPicker(!showPicker)}
                className="bg-payload-elevation-900 text-payload-elevation-50 hover:bg-payload-elevation-700 w-full cursor-pointer border-0 border-transparent transition-colors"
              >
                {showPicker ? "Predefined colors" : "Color picker"}
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
