CREATE TYPE "public"."appointment_status" AS ENUM('pending', 'confirmed', 'cancelled', 'completed');--> statement-breakpoint
CREATE TABLE "recharge_appointment" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"street" text NOT NULL,
	"city" text NOT NULL,
	"province" text NOT NULL,
	"postal_code" text NOT NULL,
	"confirmation_code" text NOT NULL,
	"notes" text,
	"status" "appointment_status" DEFAULT 'pending' NOT NULL,
	"user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "recharge_appointment_id_unique" UNIQUE("id"),
	CONSTRAINT "recharge_appointment_confirmationCode_unique" UNIQUE("confirmation_code")
);
--> statement-breakpoint
CREATE TABLE "recharge_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recharge_invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"team_id" text,
	"status" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"inviter_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recharge_member" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" text NOT NULL,
	"team_id" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recharge_organization" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"logo" text,
	"created_at" timestamp NOT NULL,
	"metadata" text,
	CONSTRAINT "recharge_organization_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "recharge_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"active_organization_id" text,
	CONSTRAINT "recharge_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "recharge_team" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"organization_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "recharge_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "recharge_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "recharge_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "recharge_appointment" ADD CONSTRAINT "recharge_appointment_user_id_recharge_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."recharge_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recharge_account" ADD CONSTRAINT "recharge_account_user_id_recharge_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."recharge_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recharge_invitation" ADD CONSTRAINT "recharge_invitation_organization_id_recharge_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."recharge_organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recharge_invitation" ADD CONSTRAINT "recharge_invitation_inviter_id_recharge_user_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."recharge_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recharge_member" ADD CONSTRAINT "recharge_member_organization_id_recharge_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."recharge_organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recharge_member" ADD CONSTRAINT "recharge_member_user_id_recharge_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."recharge_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recharge_session" ADD CONSTRAINT "recharge_session_user_id_recharge_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."recharge_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recharge_team" ADD CONSTRAINT "recharge_team_organization_id_recharge_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."recharge_organization"("id") ON DELETE cascade ON UPDATE no action;