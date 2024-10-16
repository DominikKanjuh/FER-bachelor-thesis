CREATE TABLE IF NOT EXISTS "cvs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"in_trash" boolean DEFAULT false NOT NULL,
	"cv_owner" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"content" json
);
